import React from "react";
import { withRouter } from "react-router-dom";
import LoadingSkeleton from "../LoadingSkeleton";
import {
  Row,
  Text,
  Select,
  Option,
  QuantityInput,
  HotelPrice,
  BuyButton,
  BottomSection,
  ItemRightSection,
  IconContainer
} from "./StyledComponents";
import { hotelService } from "../../services";
import deleteIcon from "../../assets/icons/trash-2.svg";

interface IHotelResponse {
  id: string;
  hotel_name: string;
  image: string;
  price: number;
  subtitle: string;
  quantity?: number;
}

interface IProps {
  history: any;
  location: any;
  match: any;
}

interface IState {
  hotelsData: Array<IHotelResponse> | null;
  errors: string | null;
}

class CartComponent extends React.Component<IProps, IState> {
  state: IState = {
    hotelsData: null,
    errors: null,
  };

  async componentDidMount() {
    const response: Array<IHotelResponse> | null = await hotelService.requestAllHotels();
    if (response) {
      if (typeof response === 'string') {
        this.setState({
          ...this.state,
          errors: response,
        });
      } else {
        const updatedData: Array<IHotelResponse> | null = !!response && response.length > 0 ? response.map(
          (i: IHotelResponse): IHotelResponse => ({ ...i, quantity: 0 })
        ) : [];
        this.setState(
          (prevState: IState): IState => ({
            ...prevState,
            hotelsData: [...updatedData],
          })
        );
      }
    }
  }

  handleDelete = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    const updatedData: Array<IHotelResponse> | null =
      this.state.hotelsData &&
      this.state.hotelsData.filter((i: IHotelResponse):
        | IHotelResponse
        // eslint-disable-next-line array-callback-return
        | undefined => {
        if (i.id !== id) {
          return i;
        }
      });
    if (updatedData && updatedData.length > 0) {
      this.setState(
        (prevState: IState): IState => ({
          ...prevState,
          hotelsData: [...updatedData],
        })
      );
    }
  };

  handleBuy = (event: React.MouseEvent) => {
    this.props.history.push("/payment");
  };

  handleChange = (id: string) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.currentTarget;

    const updatedData: Array<IHotelResponse> | null =
      this.state.hotelsData &&
      this.state.hotelsData.map(
        (i: IHotelResponse): IHotelResponse => {
          if (id === i.id) {
            i.quantity = +value;
            return i;
          }
          return i;
        }
      );
    if (updatedData) {
      this.setState(
        (prevState: IState): IState => ({
          ...prevState,
          hotelsData: [...updatedData],
        })
      );
    }
  };

  getTotal = (item: IHotelResponse) => {
    if (!!item && item.quantity && item.quantity > 0) {
      return (item.quantity * item.price).toFixed(2);
    }
    return item.price;
  };

  render() {
    const shouldDisable: boolean =
      (this.state.hotelsData &&
        this.state.hotelsData.every(
          (i: IHotelResponse): boolean => i.quantity === 0
        )) ||
      false;
    const totalPrice: number | string | null =
      this.state.hotelsData &&
      this.state.hotelsData
        .reduce((prev: number, curr: IHotelResponse): number => {
          if (!!curr && curr.quantity && curr.price) {
            prev += curr.price * curr.quantity;
          }
          return prev;
        }, 0)
        .toFixed(2);

    return (
      <div className="container cart-container">
        {!!this.state.errors && !this.state.hotelsData && (
          <Text size="24px" customStyle>
            {this.state.errors}
            <a href='/'>Click Here</a>
          </Text>
        )}
        {!this.state.errors && !this.state.hotelsData && (
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        )}
        {this.state.hotelsData &&
          this.state.hotelsData.length > 0 &&
          this.state.hotelsData.map(
            (hotel: IHotelResponse, index: number): React.ReactNode => (
              <Row key={index}>
                <div className="hotel-image-container">
                  <img height={120} width={120} src={hotel.image} alt="" />
                </div>
                <div className="hotel-item-text-container">
                  <Text size="20px">{hotel.hotel_name}</Text>
                  <Text size="16px" opacity={0.65}>
                    {hotel.subtitle}
                  </Text>
                </div>
                <ItemRightSection>
                  <IconContainer>
                    <img
                      src={deleteIcon}
                      alt=""
                      onClick={this.handleDelete(hotel.id)}
                    />
                  </IconContainer>
                  <QuantityInput>
                    <Select
                      onChange={this.handleChange(hotel.id)}
                      value={hotel.quantity}
                    >
                      {[...new Array(101).fill(0)].map(
                        (num: number, index: number): React.ReactElement => (
                          <React.Fragment key={index}>
                            <Option value={index}>{index}</Option>
                          </React.Fragment>
                        )
                      )}
                    </Select>
                    <HotelPrice>{this.getTotal(hotel)} €</HotelPrice>
                  </QuantityInput>
                </ItemRightSection>
              </Row>
            )
          )}
        {this.state.hotelsData && this.state.hotelsData.length > 0 && (
          <BottomSection>
            <p>{totalPrice} €</p>
            <BuyButton shouldDisable={shouldDisable} onClick={this.handleBuy}>buy</BuyButton>
          </BottomSection>
        )}
      </div>
    );
  }
}

export default withRouter(CartComponent);
