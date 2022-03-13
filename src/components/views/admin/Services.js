import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ProductListItem from "../../product/ProductListItem";
import { setServices } from "../../../redux/services";
import DefaultLoaderComponent from "../../global/ui/UiLoader";
import fetchServices from "../../../services/api/services";
import Modal from "../../modal/Modal";
import AddEditService from "./AddEditService";
import MainButton from "../../global/ui/UiButton";

const Services = function () {
  const serviceModalModes = { EDIT: "edit", ADD: "add" };
  Object.freeze(serviceModalModes);

  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [serviceModalMode, setServiceModalMode] = useState(
    serviceModalModes.EDIT
  );
  const [serviceToEdit, setServiceToEdit] = useState(null);

  const { services } = useSelector((state) => state.services);
  const dispatch = useDispatch();

  const onProductClick = async (id) => {
    setServiceModalMode(serviceModalModes.EDIT);

    const service = services.find((s) => s.id === id);
    setServiceToEdit(service);

    setServiceModalOpen(true);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await fetchServices();
      dispatch(setServices(data));
    }
    fetchData();
  }, [dispatch]);

  const onAddNewService = () => {
    setServiceModalMode(serviceModalModes.ADD);
    setServiceToEdit(null);
    setServiceModalOpen(true);
  };

  const onAddEditComplete = async (response) => {
    if (response.onlyClose) setServiceModalOpen(false);

    if (response.status === 200 || response.status === 201) {
      setServiceModalOpen(false);

      dispatch(setServices([]));
      const data = await fetchServices();
      dispatch(setServices(data));
    }
  };

  return (
    <>
      <Box
        className="flex flex-col justify-center items-center gap-5"
        sx={{ width: "100%" }}
      >
        {services && services[0] ? (
          <div>
            <div className="mb-8">
              <h4 className="font-semibold w-full text-center">Usługi</h4>

              <Box
                className="flex justify-center items-center flex-wrap"
                style={{ maxWidth: "992px" }}
              >
                {services.map((service) => (
                  <ProductListItem
                    key={service.id}
                    productButtonClick={() => onProductClick(service.id)}
                    selected={service.selected}
                    name={service.name}
                    time={service.time}
                    description={service.description}
                    price={service.price}
                    buttonText="Edytuj"
                    photo={service.productImage}
                  />
                ))}
              </Box>
            </div>
            <div className="w-full px-5">
              <MainButton
                fullWidth
                text="Dodaj nową usługę"
                onClick={onAddNewService}
              />
            </div>
          </div>
        ) : (
          <DefaultLoaderComponent className="mt-7" />
        )}
      </Box>
      <Modal
        open={serviceModalOpen}
        title={
          serviceModalMode === serviceModalModes.EDIT
            ? "Edytuj usługę"
            : "Dodaj usługę"
        }
        setOpen={setServiceModalOpen}
      >
        <AddEditService
          onComplete={onAddEditComplete}
          service={serviceToEdit}
          mode={serviceModalMode}
        />
      </Modal>
    </>
  );
};

export default Services;
