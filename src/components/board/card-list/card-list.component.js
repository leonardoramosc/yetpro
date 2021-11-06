import React, { createRef, useState } from "react";
import { useEffect } from "react";
import cx from "classnames";
import "./card-list.styles.scss";

import OpenAddListBtn from "./open-add-list-btn/open-add-list-btn.component";
import AddListForm from "./add-list-form/add-list-form.component";
import Card from "../card/card.component";
/**
 * El CardList debe tener una lista de tarjetas,
 * en caso de no tenerlas, la renderizacion debe cambiar.
 * Las tarjetas se deben obtener desde una API, y la llamada
 * se debe realizar dentro de este mismo componente porque
 * es un estado que no pertenecera a ningun otro component
 */
const CardList = ({ title, cardItems = [] }) => {
  const [listTitle, setListTitle] = useState(title);
  const [cards, setCards] = useState(cardItems);
  const [modAddIsIdle, setModAddIsIdle] = useState(true);
  const [addNewCard, setAddNewCard] = useState(false);
  const mainElementRef = createRef();

  useEffect(() => {
    console.log(listTitle);
  }, [listTitle]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const rootEl = mainElementRef.current;

      if (!modAddIsIdle && rootEl && !rootEl.contains(event.target)) {
        setModAddIsIdle(true);
      }

      if (addNewCard && rootEl && !rootEl.contains(event.target)) {
        setAddNewCard(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  const handleAddNewCard = (cardTitle) => {
    setCards([...cards, { title: cardTitle, id: Math.random() * 100000 }]);
    setAddNewCard(false);
  };

  return (
    <div
      ref={mainElementRef}
      className={cx("list-wrapper", {
        "mod-add": !listTitle && true,
        "is-idle": modAddIsIdle,
      })}
    >
      {listTitle && (
        <div className="list-content">
          <div className="list-header">
            <AddListForm
              className="edit-title"
              withControls={false}
              inputValue={listTitle}
              onInputBlur={(title) => setListTitle(title)}
            />
          </div>

          {cards.length > 0 && (
            <div className="cards-container">
              {cards.map((card) => (
                <Card className="cards-item" key={card.id} title={card.title} />
              ))}
            </div>
          )}

          {addNewCard === false ? (
            <button
              className="add-card-btn"
              onClick={() => setAddNewCard(true)}
            >
              <i className="medium material-icons">add</i>
              Añada una tarjeta
            </button>
          ) : (
            <AddListForm
              useTextArea
              withControls
              submitText="Añadir tarjeta"
              inputPlaceholder="Introduzca un título para esta tarjeta..."
              onSubmit={handleAddNewCard}
            />
          )}
        </div>
      )}

      <OpenAddListBtn
        className="open-add-list-btn"
        onClick={() => setModAddIsIdle(false)}
      />

      {!listTitle && !modAddIsIdle && (
        <AddListForm
          withControls={true}
          submitText="Agregar lista"
          onClose={() => setModAddIsIdle(true)}
          onSubmit={(title) => {
            setModAddIsIdle(true);
            setListTitle(title);
          }}
        />
      )}
    </div>
  );
};

export default CardList;
