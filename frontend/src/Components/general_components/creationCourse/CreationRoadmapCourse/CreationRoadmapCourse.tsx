import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { RoadmapItem } from "../../../../types/Rodmap";
import { ButtonEdd } from "../../buttonEdd";
import { ButtonCross } from "../../buttonCross";
import "./CreationRoadmapCourse.scss";

type CreatingRoadmap = {
  item: Omit<RoadmapItem, "roadmapId">[];
};

export const CreationRoadmapCourse: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatingRoadmap>({
    defaultValues: {
      item: [{ roadmapTitle: "FFFFFFFFFF", roadmapText: "pes F" }],
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "item",
  });

  const onSubmit: SubmitHandler<CreatingRoadmap> = (data) => {
    console.log(data);
  };

  const eddItem = () => {
    append({
      roadmapTitle: "",
      roadmapText: "",
    });
  };

  const delItem = (index: number) => {
    remove(index);
  };

  return (
    <article className="creation-roadmap">
      <h2 className="creation-roadmap__title">Roadmap</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="creation-roadmap__list">
          {fields.map((field, index) => (
            <li className="creation-roadmap__cell" key={field.id}>
              <label className="creation-roadmap__label">
                <h4 className="creation-roadmap__input-title">Title</h4>
                <input
                  type="text"
                  {...register(`item.${index}.roadmapTitle`)}
                  className="creation-roadmap__input"
                />
              </label>

              <label className="creation-roadmap__label">
                <h4 className="creation-roadmap__input-title">Text</h4>
                <textarea
                  {...register(`item.${index}.roadmapText`)}
                  className="creation-roadmap__input creation-roadmap__input--textarea"
                />
              </label>

              <div className="creation-roadmap__button-cross">
                <ButtonCross onClick={() => delItem(index)} />
              </div>
            </li>
          ))}
        </ul>

        <ButtonEdd onClick={eddItem} />
        <button type="submit">submit</button>
      </form>
    </article>
  );
};
