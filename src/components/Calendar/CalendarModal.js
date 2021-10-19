import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";

import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";

import "../../index.css";
import customStyles from "../../helpers/custom-styles";
import { eventClearEventActive, eventStartAddNew, eventStartUpdate } from "../../actions/events";

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const then = now.clone().add(1, "hours");

const initEvents = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: then.toDate(),
};

const CalendarModal = () => {
  const dispatch = useDispatch();

  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(then.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvents);

  const { notes, title, start, end } = formValues;

  useEffect(() => {
    activeEvent ? setFormValues(activeEvent) : setFormValues(initEvents)
  }, [activeEvent])

  const handleInputChanges = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    setFormValues(initEvents);
    dispatch(eventClearEventActive())
  };

  const handleDateStartChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleDateEndChange = (e) => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La fecha de finalizacion debe ser mayor a la de inicio",
      });
    }
    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    if(activeEvent){
      dispatch(eventStartUpdate(formValues))
    }else {
      dispatch(eventStartAddNew(formValues));
    }
    
    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> { activeEvent ? 'Editar Cita' : 'Crear Cita' } </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleDateStartChange}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleDateEndChange}
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChanges}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChanges}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

export default CalendarModal;
