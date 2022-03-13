import React from "react";
import styled from "styled-components";
import MainButton from "../global/ui/UiButton";
import noPhotoImage from "../../assets/icons/no-photo.svg";

const ListItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 90%;
  margin: 0 auto;
  border-top: 1px solid #000;
  @media all and (min-width: 640px) {
    flex-direction: row;
    align-items: center;
  }

  &:first-of-type {
    border: none;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

const ProductImage = styled.img`
  width: 40px;
  margin: 0;
  padding: 0;
`;

const ProductDetails = styled.div`
  flex: 4;
`;

const ProductHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const ProductName = styled.h4`
  margin: 0;
  padding: 0;
  font-weight: 600;
  margin-right: 5px;
  text-align: left;
`;

const ProductDuration = styled.span`
  color: rgba(33, 33, 33, 0.6);
  font-size: 12px;
`;

const ProductDescription = styled.div`
  color: rgba(66, 66, 66, 0.6);
  font-size: 13px;
`;

const ProductPrice = styled.div`
  white-space: nowrap;
  flex: 1;

  margin: 0 5px;
  font-size: 14px;
  text-align: right;
  @media all and (min-width: 576px) {
    padding-right: 10px;
  }
`;

const ProductsBookingSection = styled.div`
  padding-top: 1rem;
  @media all and (min-width: 640px) {
    min-width: 120px;
    padding: 0;
  }
  margin: 0;
`;

const ProductListItem = function ({
  buttonText,
  name,
  time,
  description,
  selected,
  productButtonClick,
  price,
  photo,
  hideImage = false,
}) {
  return (
    <ListItemWrapper>
      <div className="flex-grow flex items-center">
        {!hideImage && (
          <ImageWrapper>
            <ProductImage height="40px" width="40px"
              src={
                photo ? `${process.env.REACT_APP_API}${photo}` : noPhotoImage
              }
            />
          </ImageWrapper>
        )}

        <ProductDetails>
          <ProductHeader>
            <ProductName>{name}</ProductName>
            {time && <ProductDuration>{time} min</ProductDuration>}
          </ProductHeader>
          <ProductDescription>{description}</ProductDescription>
          {
            // TODO: przy dlugich opisach uslug wyswietlic tylko poczatek i .... lub klik szczegoly i collapse/accordion https://www.npmjs.com/package/rc-collapse
          }
        </ProductDetails>
        <ProductPrice>{price} PLN</ProductPrice>
      </div>
      <ProductsBookingSection>
        <MainButton
          fullWidth
          active={selected}
          text={buttonText || (selected ? "wybrano" : "wybierz")}
          onClick={productButtonClick}
        />
      </ProductsBookingSection>
    </ListItemWrapper>
  );
};

export default ProductListItem;
