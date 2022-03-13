import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import noPhotoImage from "../../../assets/icons/no-photo.svg";
import UiInput from "../../global/ui/UiInput";
import UiTextarea from "../../global/ui/UiTextarea";
import MainButton from "../../global/ui/UiButton";
import Loader from "../../global/Loader";
import { deleteServiceFromStore } from "../../../redux/services";
import { deleteService } from "../../../services/api/services";

const AddEditService = function ({ service, mode, onComplete }) {
  const dispatch = useDispatch();

  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [requestPending, setRequestPending] = useState(false);

  const [fields, setFields] = useState([
    {
      type: "text",
      required: true,
      placeholder: "Nazwa usługi",
      value: "",
      name: "name",
    },
    {
      type: "number",
      required: true,
      placeholder: "Cena (PLN)",
      value: "",
      name: "price",
    },
    {
      type: "number",
      required: true,
      placeholder: "Czas trwania (min.)",
      value: "",
      name: "time",
    },
    {
      type: "textarea",
      required: true,
      value: "",
      name: "description",
    },
  ]);

  useEffect(() => {
    setUploadedImageSrc(
      service && service.productImage
        ? `${process.env.REACT_APP_API}${service.productImage}`
        : noPhotoImage
    );
    if (service && mode === "edit") {
      const tmpFields = [...fields];
      tmpFields.map((field) => {
        const tmpField = field;
        tmpField.value = service[field.name];
        return tmpField;
      });
      setFields(tmpFields);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imageChangeHandler = (e) => {
    setUploadedImageSrc(URL.createObjectURL(e.target.files[0]));
    setUploadedImage(e.target.files[0]);
  };

  const onInputChange = (e) => {
    const newFields = fields.map((field) => {
      const tmpField = field;
      if (field.name === e.field.name) tmpField.value = e.text;
      return tmpField;
    });
    setFields(newFields);
  };
  const onServiceRemove = async () => {
    setRequestPending(true);
    const res = await deleteService(service.id);
    if (res && res.data && res.data.deletedCount) {
      await dispatch(deleteServiceFromStore(service.id));
    }
    setRequestPending(false);
    onComplete({ onlyClose: true });
  };
  const onSaveChanges = async () => {
    const data = new FormData();
    data.append("productImage", uploadedImage);

    fields.forEach((field) => {
      data.append(field.name, field.value);
    });

    let response;

    setRequestPending(true);
    if (mode === "edit" && service && service.id) {
      response = await axios.patch(
        `http://localhost:8080/products/${service.id}`,
        data
      );
    } else if (mode === "add") {
      response = await axios.post("http://localhost:8080/products", data);
    }
    setRequestPending(false);

    onComplete(response);
  };

  return (
    <Loader loading={requestPending}>
      <div className="o-addEditService  md:flex mb-5">
        <div className=" o-addEditService__image-wrapper flex flex-col justify-center items-center">
          <div className="o-addEditService__image mb-3">
            {uploadedImageSrc && (
              <div className="o-addEditService__image">
                <img height="auto" width="auto" alt="" src={uploadedImageSrc} />
              </div>
            )}
          </div>
          <input
            className="hidden"
            type="file"
            id="selectedFile"
            onChange={imageChangeHandler}
          />
          <MainButton
            fullWidth
            textTiny
            customStyle={{ padding: 0 }}
            text="Wybierz zdjęcie"
            onClick={() => document.getElementById("selectedFile").click()}
          />
        </div>
        <div className="md:pl-7 o-addEditService__details">
          {fields &&
            fields.map((field) => {
              return (
                <div className="o-addEditService__input" key={field.name}>
                  {field.type === "textarea" && (
                    <UiTextarea
                      text={field.value}
                      placeholder="Opis usługi..."
                      onChange={(e) => onInputChange({ text: e, field })}
                    />
                  )}
                  {field.type !== "textarea" && (
                    <UiInput
                      type={field.type}
                      fullWidth
                      placeholder={field.placeholder}
                      text={field.value}
                      onChange={(e) => onInputChange({ text: e, field })}
                      required={field.required}
                      name={field.name}
                    />
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex">
        <div>
          <MainButton danger text="Usuń" onClick={onServiceRemove} />
        </div>
        <div className="flex-grow ml-5">
          <MainButton
            fullWidth
            text={mode === "edit" ? "Zapisz zmiany" : "Dodaj usługę"}
            onClick={onSaveChanges}
          />
        </div>
      </div>
    </Loader>
  );
};

AddEditService.defaultProps = {
  service: {},
  mode: "add",
  onComplete: () => {},
};
AddEditService.propTypes = {
  service:
    PropTypes.shape({
      id: PropTypes.string,
      productImage: PropTypes.string,
    }) || null,
  mode: PropTypes.string,
  onComplete: PropTypes.func,
};

export default AddEditService;
