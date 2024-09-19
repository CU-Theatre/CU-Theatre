import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Upload } from "../upload/Upload";
import "./CreationCourse.scss";
import { CreationCourseFormType } from "../../../types/CreationCourseFormType";
import { useEffect } from "react";
import { useAppContext } from "../../../AppContext";
import { CreationRoadmapCourse } from "./CreationRoadmapCourse";
import { ButtonEdd } from "../buttonEdd";
import { ButtonCross } from "../buttonCross";

type Props = {
  isOpen: boolean;
  onSubmit: SubmitHandler<CreationCourseFormType>;
  isCreating: boolean;
  isLoading: boolean;
};

export const CreationCourse: React.FC<Props> = ({
  isOpen,
  onSubmit,
  isCreating,
  isLoading,
}) => {
  const {
    register,
    control,
    handleSubmit: handleSubmitForm1,
    reset,
  } = useForm<CreationCourseFormType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "roadmap",
  });

  const { courseInfo } = useAppContext();

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
    append({
      title: "",
      text: "",
      mainTitle: '',
    });
  };

  const delItem = (index: number) => {
    remove(index);
  };

  return (
    <>
      <form onSubmit={handleSubmitForm1(onSubmit)} className="creation-course">
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
              Course's duration
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
              Course's duration
            </label>
            <input
              type="date"
              id="course-duration"
              className="creation-course__input creation-course__input--date"
              {...register("finishDate", { required: true })}
              disabled={isLoading}
            />
          </div>
        </div>

        <Upload onUpload={onUploadIcon} />

        <Upload onUpload={onUploadImg} />

        <ul className="creation-course__roadmap-list">
          {fields.map((field, index) => (
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
