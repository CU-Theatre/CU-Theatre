import React, { useEffect, useState } from "react";
import "./YourAccount.scss";
import homeIcon from "../../img/header/accountHomeIcon.svg";
import { useAppContext } from "../../../AppContext";
import { SignButton } from "../signButton";
import happyMask from "../../img/AccountImg/happymask.svg";
import { Course } from "../Course";
import { Link, useNavigate } from "react-router-dom";
import { KEY_TOKEN } from "../../../utils/globalVariables";
import { SubmitHandler, useForm } from "react-hook-form";
import { getCurrentUser, updateUser } from "../../../api/userApi";
import { useTokenLocalStorage } from "../../../hooks/useLocalStorage";
import { FetchErrorMessage } from "../../../types/FetchErrorMessage";
import { validEmail } from "../../../utils/validEmail";
import { CabinetFormInput } from "../../../types/CabinetFormInput";
import { ErrorNotification } from "../errorNotification";
import { ShowType } from "../../../types/ShowType";
import { User } from "../../../types/User";
import { EventsTable } from "../EventSubscr/eventsTable";
import { events } from "../../../utils/events";
import { filterEventsByUser } from "../../../utils/filterEventsByUser";
import { allCourses } from "../../../utils/courses";
import classNames from "classnames";
import { updateEmergencyContact } from "../../../api/emergency-contactApi";
import { Loader } from "../Loader";

export const YourAccount: React.FC = () => {
  const { userState, setUserState, setIsLoginned, currentShows, setCurrentShows, currUserEmergency } =
    useAppContext();
  const [isRootErrShown, setIsRootErrShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [temporaryShows, setTemporaryShows] = useState<ShowType[]>(currentShows);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyLastName, setEmergencyLastName] = useState('');
  const [emergencyRelation, setEmergencyRelation] = useState('');
  const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState('');
  const [emergencyId, setEmergencyId] = useState(0);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    name: '',
    lastname: '',
    relation: '',
    phonenumber: ''
  });
  const nums = '+0123456789';
  const userEvents = userState 
    ? filterEventsByUser(events, { name: userState?.firstName, surname: userState?.lastName }) 
    :  {
      mainEvents: {
        impro: [],
        playback: [],
        livePerf: []
      },
      otherClasses: {
        heels: [],
        twerk: [],
        exotic: [],
        poleDance: [],
        stretching: []
      }
    };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<CabinetFormInput>();

  const [token] = useTokenLocalStorage();
  const promises: Promise<any>[] = [];

  
  
  useEffect(() => {
    setIsLoading(true);
    setLoadingPage(true);
    const userPromise = getCurrentUser(token)
    .then((newUser) => {
      reset(newUser);
        setUserState(newUser);
      })
      .catch((err: Error) => {
        switch (err.message) {
          case FetchErrorMessage.Unauthorized:
          case FetchErrorMessage.InternalServerError:
            setIsLoginned(false);
            navigate("/log-in");
            break;

          default:
            console.error(err);
            setErrorMessage("Something went wrong. Reload the page.");
            setIsRootErrShown(true);
            break;
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
      promises.push(userPromise)
  }, []);

  useEffect(() => {
    if (
      currUserEmergency?.firstName &&
      currUserEmergency?.lastName &&
      currUserEmergency?.relation &&
      currUserEmergency?.phoneNumber &&
      currUserEmergency.id
    ) {
      setEmergencyName(currUserEmergency.firstName);
      setEmergencyLastName(currUserEmergency.lastName);
      setEmergencyRelation(currUserEmergency.relation);
      setEmergencyPhoneNumber(currUserEmergency.phoneNumber);
      setEmergencyId(currUserEmergency.id);
    }
  }, [currUserEmergency]);

  useEffect(() => {
    Promise.all(promises)
    .catch((err) => console.log("Error loading data:", err))
    .finally(() => setLoadingPage(false));
  }, []);


  const handleInputChange = (stateType: string, value: string) => {
    let newErrors = { ...inputErrors };
  
    switch (stateType) {
      case 'name':
         if (value === '' || [...value].every(char => nums.includes(char) === false)) {
           setEmergencyName(value);
            newErrors.name = '';
            break;
         } else {
          newErrors.name = 'Name must contain only chars';
          break;
         }
      
      case 'lastname':
         if (value === '' || [...value].every(char => nums.includes(char) === false)) {
           setEmergencyLastName(value);
            newErrors.lastname = '';
            break;
         } else {
          newErrors.lastname = 'Last Name must contain only chars';
          break;
         }

      case 'relation':
         if (value === '' || [...value].every(char => nums.includes(char) === false)) {
           setEmergencyRelation(value);
            newErrors.relation = '';
            break;
         } else {
          newErrors.relation = 'Relation must contain only chars';
          break;
         }
      
      case 'phonenumber':
        if (value === '' || [...value].every(char => nums.includes(char))) {
          setEmergencyPhoneNumber(value);
          newErrors.phonenumber = '';
          break 
        } else {
          newErrors.phonenumber = 'Phone number must contain only numbers';
          break;
        }
      
      default:
        return;
    }

    setInputErrors(newErrors);
  }  
  
  const handleUpdateEmergency = () => {
    let newErrors = {...inputErrors};
    const trimmedData = {
      id: emergencyId,
      firstName: emergencyName.trim(),
      lastName: emergencyLastName.trim(),
      phoneNumber: emergencyPhoneNumber.trim(),
      relation: emergencyRelation.trim(),
    };
    newErrors.name = trimmedData.firstName ? '' : 'This field is required! Please fill it';
    newErrors.lastname = trimmedData.lastName ? '' : 'This field is required! Please fill it';
    newErrors.relation = trimmedData.relation ? '' : 'This field is required! Please fill it';
    newErrors.phonenumber = trimmedData.phoneNumber ? '' : 'This field is required! Please fill it';
    
    setInputErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error);
    if (hasErrors) {
      return;
    }

    setLoadingButton(true);

    updateEmergencyContact(trimmedData, token)
    .then((contact) => {
      console.log('updatedContact', contact);
    })
    .catch((err) => {
      console.log('failed to add contact', err);
    })
    .finally(() => {
      setLoadingButton(false);
    });
  };



  const handleSave: SubmitHandler<CabinetFormInput> = (data) => {
    setIsLoading(true);
    setErrorMessage("");
    setIsRootErrShown(false);

    if (!userState) return;
  
    const updatedUser: User = {
      ...userState,
      id: userState?.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      currentCourses: userState?.currentCourses || [],
      dramaCourseFinished: userState?.dramaCourseFinished || false,
      roleName: userState?.roleName || "customer",
    };
  
    updateUser(updatedUser, token, userState.id)
      .then((response) => {
        setUserState(response);
        setErrorMessage("Your changes were successfully saved!");
      })
      .catch((err: Error) => {
        switch (err.message) {
          case FetchErrorMessage.Occupied:
            setErrorMessage("This email address is already taken");
            break;
          default:
            setErrorMessage("Something went wrong. Your changes did not save.");
            break;
        }
        setIsRootErrShown(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logOut = () => {
    setIsLoginned(false);
    navigate("/");
    setUserState(null);

    window.localStorage.removeItem(KEY_TOKEN);
  };

  const handleShowChange = (index: number, field: keyof ShowType, value: string) => {
    const updatedShows = [...temporaryShows];
    updatedShows[index] = {
      ...updatedShows[index],
      [field]: value,
    };

    setTemporaryShows(updatedShows);
  };

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const updatedShows = [...temporaryShows];
      updatedShows[index] = {
        ...updatedShows[index],
        showImg: event.target?.result as string,
      };
      setTemporaryShows(updatedShows);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitShowChanges = (e: React.FormEvent<HTMLFormElement>, index: number) => {
    e.preventDefault();
    setCurrentShows(temporaryShows);
    setIsModalVisible(true);
    setTimeout(() => {
      setIsModalVisible(false);
    }, 3000);
  };

  return (
    loadingPage ? (
      <Loader />
    ) : (
      <section className="cabinet">
        <div className="cabinet__container">
          <div className="cabinet__content">
            <div className="cabinet__top-block">
              <div className="cabinet__title-block">
                <img className="cabinet__icon" src={homeIcon} alt="home-icon" />
                <h2 className="cabinet__title title">Your account</h2>
              </div>
              <h3 className="cabinet__subtitle">{`Hello, ${userState?.firstName} 😎`}</h3>
            </div>

            <form
              className="cabinet__user-info"
              onSubmit={handleSubmit(handleSave)}
            >
              <div className="cabinet__user-item">
                <label className="cabinet__user-field" htmlFor="username">
                  First name
                </label>
                <input
                  {...register("firstName", { required: true })}
                  id="username"
                  className="cabinet__user-name"
                  type="text"
                  disabled={isLoading}
                />
              </div>
              <div className="cabinet__user-item">
                <label className="cabinet__user-field" htmlFor="usersurname">
                  Last name
                </label>
                <input
                  {...register("lastName", { required: true })}
                  id="usersurname"
                  className="cabinet__user-name"
                  type="text"
                  disabled={isLoading}
                />
              </div>
              <div className="cabinet__user-item">
                <label className="cabinet__user-field" htmlFor="userEmail">
                  Email
                </label>
                <input
                  {...register("email", { required: true, validate: validEmail })}
                  id="userEmail"
                  className="cabinet__user-name"
                  type="email"
                  disabled={isLoading}
                />
              </div>
              <div className="cabinet__user-item">
                <label className="cabinet__user-field" htmlFor="userEmail">
                  Phone number
                </label>
                <input
                  {...register("phoneNumber", { required: true })}
                  id="userEmail"
                  className="cabinet__user-name"
                  type="tel"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                className="cabinet__submit white-button"
                disabled={isLoading}
              >
                Submit changes?
              </button>

              <button
                type="button"
                className="white-button cabinet__log-out"
                onClick={logOut}
                disabled={isLoading}
              >
                Log Out
              </button>

              {isRootErrShown && (
                <ErrorNotification
                  message={errorMessage}
                  setIsError={setIsRootErrShown}
                />
              )}
            </form>

            <img
              className="cabinet__happy-mask"
              src={happyMask}
              alt="happymask"
            />
          </div>
          {userState?.currentCourses?.length &&
          userState?.currentCourses?.length < 1 ? (
            <div className="cabinet__main">
              <h3 className="cabinet__main-title">
                {"You are not subscribed to any course yet :("}
              </h3>
              <SignButton title="Sign for a course?" path="/our-courses"/>
            </div>
          ) : (
            <div className="cabinet__main">
              <h3 className="cabinet__main-title">Assigned courses:</h3>
              <div className="cabinet__courses">
                {userState?.currentCourses && userState.currentCourses.map((courseId) => (
                  <Course key={allCourses[courseId].name} courseId={courseId - 1} />
                ))}
              </div>
            </div>
          )}
          <div className="cabinet__user-events">
            <h3 className="cabinet__events-title title">Your events</h3>
            <EventsTable events={userEvents} />
          </div>
          <Link to={"/users-table"} className="cabinet__users-table">
            Users table page
          </Link>
            <div className="cabinet__emergency-info">
              <h3 className="cabinet__emergency-title title">Emergency contact info</h3>
              <form className='cabinet__emergency-form'>
                <div className='cabinet__emergency-block'>
                  <label className='cabinet__emergency-label'>
                  First Name
                  <input
                    value={emergencyName} 
                    onChange={e => handleInputChange('name', e.target.value)} 
                    className='cabinet__emergency-input' 
                    type="text" 
                    placeholder='First Name'
                  />
                </label>
                {inputErrors.name && <span className='cabinet__emergency-error'>{inputErrors.name}</span>}
                </div>
                <div className='cabinet__emergency-block'>
                  <label className='cabinet__emergency-label'>
                    Last Name
                    <input 
                      value={emergencyLastName} 
                      onChange={e => handleInputChange('lastname', e.target.value)} 
                      className='cabinet__emergency-input' 
                      type="text" 
                      placeholder='Last Name'
                    />
                  </label>
                  {inputErrors.lastname && <span className='cabinet__emergency-error'>{inputErrors.lastname}</span>}
                </div>
                <div className='cabinet__emergency-block'>
                  <label className='cabinet__emergency-label'>
                    Relation
                    <input 
                      value={emergencyRelation} 
                      onChange={e => handleInputChange('relation', e.target.value)} 
                      className='cabinet__emergency-input' 
                      type="text" 
                      placeholder='Relation'
                    />
                  </label>
                  {inputErrors.relation && <span className='cabinet__emergency-error'>{inputErrors.relation}</span>}
                </div>
                <div className='cabinet__emergency-block'>
                  <label className='cabinet__emergency-label'>
                    Phone Number
                    <input 
                      value={emergencyPhoneNumber} 
                      onChange={e => handleInputChange('phonenumber', e.target.value)} 
                      className='cabinet__emergency-input' 
                      type="text" 
                      placeholder='Phone number'
                    />
                  </label>
                  {inputErrors.phonenumber && <span className='cabinet__emergency-error'>{inputErrors.phonenumber}</span>}
                </div>
                <button 
                  type='button' 
                  className={classNames('cabinet__emergency-button', {'cabinet__emergency-button--disabled': loadingButton})}
                  onClick={handleUpdateEmergency}
                  disabled={loadingButton}
                >
                  {loadingButton ? (
                    <div className="cabinet__emergency-button-content" />
                  ) : (
                    'Update info'
                  )}
                </button>
              </form>
            </div>
          <div className="cabinet__shows">
            <h2 className="cabinet__title title">Shows editor</h2>
            <div className="cabinet__allShows">
              {temporaryShows.map((someShow, index) => (
                <form 
                  className="cabinet__show" 
                  key={index} 
                  onSubmit={(e) => {
                    handleSubmitShowChanges(e, index);
                  }}
                >
                  <label className="cabinet__show-label">
                    Show name:
                    <input 
                      type="text"
                      className="cabinet__show-input"
                      value={someShow.showName}
                      onChange={(e) => handleShowChange(index, "showName", e.target.value)}
                      readOnly={true}
                    />
                  </label>
                  <label className="cabinet__show-label">
                    Show date:
                    <input 
                      type="text"
                      className="cabinet__show-input"
                      value={someShow.showDate}
                      onChange={(e) => handleShowChange(index, "showDate", e.target.value)}
                    />
                  </label>
                  <label>
                    Show image:
                    <img
                      className="cabinet__show-img"
                      src={someShow.showImg}
                      alt="showImage"
                      onClick={() => document.getElementById(`file-input-${index}`)?.click()}
                    />
                    <input
                      type="file"
                      id={`file-input-${index}`}
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files && handleImageUpload(index, e.target.files[0])
                      }
                    />
                  </label>
                  <label className="cabinet__show-label">
                    Show price: 
                    <input 
                      type="text"
                      className="cabinet__show-input"
                      value={someShow.showPrice}
                      onChange={(e) => handleShowChange(index, "showPrice", e.target.value)}
                      />
                  </label>
                  <label className="cabinet__show-label">
                    Show title:
                    <input 
                      type="text"
                      className="cabinet__show-input"
                      value={someShow.showTitle}
                      onChange={(e) => handleShowChange(index, "showTitle", e.target.value)}
                      />
                  </label>

                  <button className="cabinet__show-submit" type="submit">Submit changes</button>
                </form>
              ))}
            </div>
          </div>

          {isModalVisible && (
            <div className="cabinet__modal">
              <div className="cabinet__modal-content">
                <p>Changes saved successfully!</p>
              </div>
              <div className="cabinet__progress-bar"></div>
            </div>
          )}
        </div>
      </section>
    )
  );
};
