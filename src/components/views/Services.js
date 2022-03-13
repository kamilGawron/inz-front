import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ProductListItem from "../product/ProductListItem";
import { toggleItemSelect, setServices } from "../../redux/services";
import { ProgressBarSteps, setReadyStep } from "../../redux/progressBar";
import { addService } from "../../redux/reservation";
import DefaultLoaderComponent from "../global/ui/UiLoader";
import fetchServices from "../../services/api/services";

const Services = function () {
  const { services } = useSelector((state) => state.services);

  const dispatch = useDispatch();

  const onProductClick = async (id) => {
    await dispatch(toggleItemSelect(id));
  };

  useEffect(() => {
    async function fetchData() {
      const data = await fetchServices();
      dispatch(setServices(data));
    }
    if (!services) fetchData();
  }, [services, dispatch]);

  useEffect(() => {
    if (!services) return;

    const itemSelected = services.some((e) => e.selected);

    if (itemSelected) {
      dispatch(setReadyStep({ step: { name: ProgressBarSteps.DATETIME } }));
    } else {
      dispatch(
        setReadyStep({
          step: { name: ProgressBarSteps.DATETIME },
          ready: false,
        })
      );
    }

    services.forEach((service) => {
      if (service.selected) {
        dispatch(addService({ ...service, amount: 1 }));
      } else {
        dispatch(addService({ ...service, amount: 0 }));
      }
    });
  }, [services, dispatch]);

  return (
    <Box
      className="flex flex-col justify-center items-center gap-5"
      sx={{ width: "100%" }}
    >
      {services && services[0] && (
        <div>
          <h4 className="font-semibold w-full text-center">Wybierz usługi</h4>

          <Box className="flex justify-center items-center flex-wrap">
            {services.map((service) => (
              <ProductListItem
                key={service.id}
                productButtonClick={() => onProductClick(service.id)}
                selected={service.selected}
                name={service.name}
                time={service.time}
                description={service.description}
                price={service.price}
                photo={service.productImage}
              />
            ))}
          </Box>
        </div>
      )}

      {services && services.length === 0 && <div>Brak dostępnych usług</div>}
      {services === null && <DefaultLoaderComponent className="mt-7" />}
    </Box>
  );
};

export default Services;
