import React, { useState } from 'react';
import './EmergencyContact.scss';
import { useAppContext } from '../../../AppContext';
import { addEmergencyContact } from '../../../api/emergency-contactApi';
import { useTokenLocalStorage } from '../../../hooks/useLocalStorage';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

export const EmergencyContact: React.FC = () => {
  const { userState } = useAppContext();
  const [token] = useTokenLocalStorage();
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyLastName, setEmergencyLastName] = useState('');
  const [emergencyRelation, setEmergencyRelation] = useState('');
  const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const navigate = useNavigate();
  const [inputErrors, setInputErrors] = useState({
    name: '',
    lastname: '',
    relation: '',
    phonenumber: ''
  });
  const nums = '+0123456789';

  const clearForm = () => {
    setEmergencyName('');
    setEmergencyLastName('');
    setEmergencyRelation('');
    setEmergencyPhoneNumber('');
  } 

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

  const handleSubmitInfo = () => {
    let newErrors = {...inputErrors};
    const trimmedData = {
      userId: userState?.id,
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

    addEmergencyContact(trimmedData, token)
    .then((contact) => {
      console.log('newContact', contact);
      navigate('/our-courses');
    })
    .catch((err) => {
      console.log('failed to add contact', err);
    })
    .finally(() => {
      setLoadingButton(false);
      clearForm();
    });
  };

  return (
    <div className='emergency-contacts'>
      <div className='emergency-contacts__container'>
        <h2 className='emergency-contacts__title title'>We Need Your Emergency Contact Information</h2>
        <p className='emergency-contacts__subtitle'>
          We’re committed to ensuring your safety and well-being. By providing us with an emergency contact,
          you allow us to reach someone you trust if an urgent situation arises and we’re unable to contact you directly. 
          This information will only be used in case of emergency and helps us provide a higher level of care and support.
        </p>
        <div className='emergency-contacts__content'>
          <form className='emergency-contacts__form'>
            <legend className='emergency-contacts__legend'>Please, enter details of your emergency contact person</legend>
            <div className='emergency-contacts__block'>
              <label className='emergency-contacts__label'>
              First Name
              <input
                value={emergencyName} 
                onChange={e => handleInputChange('name', e.target.value)} 
                className='emergency-contacts__input' 
                type="text" 
                placeholder='First Name'
              />
            </label>
            {inputErrors.name && <span className='emergency-contacts__error'>{inputErrors.name}</span>}
            </div>
            <div className='emergency-contacts__block'>
              <label className='emergency-contacts__label'>
                Last Name
                <input 
                  value={emergencyLastName} 
                  onChange={e => handleInputChange('lastname', e.target.value)} 
                  className='emergency-contacts__input' 
                  type="text" 
                  placeholder='Last Name'
                />
              </label>
              {inputErrors.lastname && <span className='emergency-contacts__error'>{inputErrors.lastname}</span>}
            </div>
            <div className='emergency-contacts__block'>
              <label className='emergency-contacts__label'>
                Relation
                <input 
                  value={emergencyRelation} 
                  onChange={e => handleInputChange('relation', e.target.value)} 
                  className='emergency-contacts__input' 
                  type="text" 
                  placeholder='Relation'
                />
              </label>
              {inputErrors.relation && <span className='emergency-contacts__error'>{inputErrors.relation}</span>}
            </div>
            <div className='emergency-contacts__block'>
              <label className='emergency-contacts__label'>
                Phone Number
                <input 
                  value={emergencyPhoneNumber} 
                  onChange={e => handleInputChange('phonenumber', e.target.value)} 
                  className='emergency-contacts__input' 
                  type="text" 
                  placeholder='Phone number'
                />
              </label>
              {inputErrors.phonenumber && <span className='emergency-contacts__error'>{inputErrors.phonenumber}</span>}
            </div>
            <button 
              type='button' 
              className={classNames('emergency-contacts__button', {'emergency-contacts__button--disabled': loadingButton})}
              onClick={handleSubmitInfo}
              disabled={loadingButton}
            >
              {loadingButton ? (
                <div className="emergency-contacts__button-content" />
              ) : (
                'Add contact'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};