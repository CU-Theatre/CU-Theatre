import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Upload } from "../upload/Upload";
import "./CreationCourse.scss";
import { CreationCourseFormType } from "../../../types/CreationCourseFormType";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../AppContext";
import { CreationRoadmapCourse } from "./CreationRoadmapCourse";
import { ButtonEdd } from "../buttonEdd";
import { ButtonCross } from "../buttonCross";

type Props = {
  onSubmit: SubmitHandler<CreationCourseFormType>;
  isCreating: boolean;
  isLoading: boolean;
};

export const CreationCourse: React.FC<Props> = ({
  onSubmit,
  isCreating,
  isLoading,
}) => {
  const { register, control, handleSubmit, reset } =
    useForm<CreationCourseFormType>();

  const {
    fields: fieldsRoadmap,
    append: appendRoadmap,
    remove: removeRoadmap,
  } = useFieldArray({
    control,
    name: "roadmap",
  });

  const {
    fields: fieldsClassTime,
    append: appendClassTime,
    replace: replaceClassTime,
  } = useFieldArray({
    control,
    name: "classTime",
  });

  const { courseInfo } = useAppContext();

  const [classesPerWeek, setClassesPerWeek] = useState(0);

  const onUploadIcon = (data: unknown) => {
    // TODO wrote function after upload photo
  };
  const onUploadImg = (data: unknown) => {
    // TODO wrote function after upload photo
  };

  useEffect(() => {
    if (!isCreating) {
      reset(courseInfo);
    } else {
      reset();
    }
  }, [courseInfo]);

  const eddItem = () => {
    appendRoadmap({
      title: "",
      text: "",
      mainTitle: "",
    });
  };

  const delItem = (index: number) => {
    removeRoadmap(index);
  };

  const onChangeClassesPerWeek = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newClassPerWeek = +e.target.value;

    setClassesPerWeek(newClassPerWeek);

    replaceClassTime([]);

    const newFieldArr = Array(newClassPerWeek).fill({
      day: "-1",
      start: "",
      finish: "",
      end: "",
      freq: "WEEKLY",
      interval: 1,
    });

    appendClassTime(newFieldArr);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="creation-course">
        <div className="creation-course__input-cell">
          <label htmlFor="course-name" className="creation-course__label">
            Course's name
          </label>
          <input
            type="text"
            id="course-name"
            className="creation-course__input"
            {...register("name", { required: true })}
            disabled={isLoading}
          />
        </div>

        <div className="creation-course__input-cell">
          <label htmlFor="course-descr" className="creation-course__label">
            Course's description
          </label>
          <textarea
            id="course-descr"
            className="creation-course__input creation-course__input--textarea"
            {...register("description", { required: true })}
            disabled={isLoading}
          />
        </div>

        <div className="creation-course__input-cell">
          <label htmlFor="course-price" className="creation-course__label">
            Course's price
          </label>
          <input
            id="course-price"
            type="number"
            className="creation-course__input creation-course__input"
            {...register("price", { required: true })}
            disabled={isLoading}
          />
        </div>

        <div className="creation-course__duration-cell">
          <div className="creation-course__input-cell">
            <label htmlFor="course-duration" className="creation-course__label">
              Course's start Date
            </label>
            <input
              type="date"
              id="course-duration"
              className="creation-course__input creation-course__input--date"
              {...register("startDate", { required: true })}
              disabled={isLoading}
            />
          </div>

          <div className="creation-course__input-cell">
            <label htmlFor="course-duration" className="creation-course__label">
              Course's Finish Date
            </label>
            <input
              type="date"
              id="course-duration"
              className="creation-course__input creation-course__input--date"
              {...register("finishDate", { required: true })}
              disabled={isLoading}
            />
          </div>

          <div className="creation-course__input-cell">
            <label
              htmlFor="classes-per-week"
              className="creation-course__label"
            >
              Number of classes per week
            </label>
            <select
              name="classes-per-week"
              id="classes-per-week"
              value={classesPerWeek}
              onChange={onChangeClassesPerWeek}
            >
              <option value="0" disabled>
                Choose number of classes
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>

          <ul className="creation-course__classes-time-list">
            {fieldsClassTime.map((field, index) => (
              <li className="creation-course__classes-time-cell" key={field.id}>
                <label
                  htmlFor={`day-of-week-${field.id}`}
                  className="creation-course__classes-time-label"
                >
                  <h4 className="creation-course__classes-time-title">
                    Day of week
                  </h4>
                  <select
                    id={`day-of-week-${field.id}`}
                    {...register(`classTime.${index}.day`)}
                  >
                    <option value="-1" disabled>
                      Choose day of week
                    </option>
                    <option value="MO">Monday</option>
                    <option value="TU">Tuesday</option>
                    <option value="WE">Wednesday</option>
                    <option value="TH">Thursday</option>
                    <option value="FR">Friday</option>
                    <option value="SA">Sunday</option>
                    <option value="SU">Saturday</option>
                  </select>
                </label>

                <label className="creation-course__classes-time-label">
                  <h4 className="creation-course__classes-time-title">
                    Start time
                  </h4>
                  <input
                    type="time"
                    {...register(`classTime.${index}.start`)}
                    className="creation-course__classes-time"
                    disabled={isLoading}
                  />
                </label>

                <label className="creation-course__classes-time-label">
                  <h4 className="creation-course__classes-time-title">
                    Finish time
                  </h4>

                  <input
                    type="time"
                    {...register(`classTime.${index}.end`)}
                    className="creation-course__classes-time"
                    disabled={isLoading}
                  />
                </label>
              </li>
            ))}
          </ul>

          <div className="creation-course__input-cell">
            <label
              htmlFor="course-number-people"
              className="creation-course__label"
            >
              Max number of people
            </label>
            <input
              type="number"
              id="course-number-people"
              className="creation-course__input creation-course__input--date"
              {...register("maxPeople", { required: true })}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="creation-course__upload">
          <div className="creation-course__import">
            <p className="creation-course__import-text">Select course icon</p>
            <Upload onUpload={onUploadIcon} />
          </div>
          <div className="creation-course__import">
            <p className="creation-course__import-text">Select course image</p>
            <Upload onUpload={onUploadImg} />
          </div>
        </div>


        <ul className="creation-course__roadmap-list">
          {fieldsRoadmap.map((field, index) => (
            <li className="creation-course__roadmap-cell" key={field.id}>
              <label className="creation-course__roadmap-label">
                <h4 className="creation-course__roadmap-title">Main title</h4>
                <input
                  type="text"
                  {...register(`roadmap.${index}.mainTitle`)}
                  className="creation-course__input"
                  disabled={isLoading}
                />
              </label>

              <label className="creation-course__roadmap-label">
                <h4 className="creation-course__roadmap-title">Title</h4>
                <input
                  type="text"
                  {...register(`roadmap.${index}.title`)}
                  className="creation-course__input"
                  disabled={isLoading}
                />
              </label>

              <label className="creation-course__roadmap-label">
                <h4 className="creation-course__roadmap-title">Text</h4>
                <textarea
                  {...register(`roadmap.${index}.text`)}
                  className="creation-course__input creation-course__input--textarea"
                  disabled={isLoading}
                />
              </label>

              <div className="creation-course__roadmap-button-cross">
                <ButtonCross onClick={() => delItem(index)} />
              </div>
            </li>
          ))}
        </ul>

        <ButtonEdd onClick={!isLoading ? eddItem : () => {}} />

        <button
          type="submit"
          className="creation-course__save-button white-button"
          disabled={isLoading}
        >
          Save
        </button>
      </form>
    </>
  );
};
