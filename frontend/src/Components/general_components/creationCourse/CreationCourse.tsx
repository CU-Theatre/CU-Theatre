import { SubmitHandler, useForm } from "react-hook-form";
import { Upload } from "../upload/Upload";
import "./CreationCourse.scss";
import { CreationCourseFormType } from "../../../types/CreationCourseFormType";
import { useEffect } from "react";
import { useAppContext } from "../../../AppContext";

type Props = {
  isOpen: boolean;
  onSubmit: SubmitHandler<CreationCourseFormType>
  isCreating: boolean;
};


export const CreationCourse: React.FC<Props> = ({ isOpen, onSubmit, isCreating }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreationCourseFormType>();
  const {courseInfo} = useAppContext();

  const onUploadIcon = (data: unknown) => {
    // TODO wrote function after upload photo
  };
  const onUploadImg = (data: unknown) => {
    // TODO wrote function after upload photo
  };

  useEffect(() => {
    if (!isCreating) {
      reset(courseInfo)
    } else {
      reset()
    }
  }, [courseInfo])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="creation-course">
      <div className="creation-course__input-cell">
        <label htmlFor="course-name" className="creation-course__label">
          Course's name
        </label>
        <input
          type="text"
          id="course-name"
          className="creation-course__input"
          {...register("courseName", { required: true })}
        />
      </div>

      <div className="creation-course__input-cell">
        <label htmlFor="course-descr" className="creation-course__label">
          Course's description
        </label>
        <textarea
          id="course-descr"
          className="creation-course__input creation-course__input--textarea"
          {...register("courseDescr", { required: true })}
        />
      </div>

      <div className="creation-course__input-cell">
        <label htmlFor="course-price" className="creation-course__label">
          Course's price
        </label>
        <input
          id="course-price"
          className="creation-course__input creation-course__input"
          {...register("coursePrice", { required: true })}
        />
      </div>

      <div className="creation-course__input-cell">
        <label htmlFor="course-duration" className="creation-course__label">
          Course's duration
        </label>
        <input
          id="course-duration"
          className="creation-course__input creation-course__input"
          {...register("courseDuration", { required: true })}
        />
      </div>

      <Upload onUpload={onUploadIcon} />

      <Upload onUpload={onUploadImg} />
    </form>
  );
};
