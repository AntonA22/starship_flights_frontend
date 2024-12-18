import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import mockImage from "src/assets/mock.png";
import {Link} from "react-router-dom";
import {T_Ship} from "modules/types.ts";
import { dest_img } from "../../../target_config"
// import {useAppSelector} from "store/store.ts";
import {useAppDispatch} from "src/store/store.ts";
import {addShipToFlight, fetchShips} from "src/store/slices/shipsSlice.ts";

interface ShipCardProps {
    ship: T_Ship,
    isMock: boolean,
    showAddBtn?: boolean,
}

const ShipCard: React.FC<ShipCardProps> = ({ ship, isMock,  showAddBtn = false }) => {
    // const isAuthenticated = useAppSelector((state) => state.cookie.is_authenticated)
    const dispatch = useAppDispatch()


    const handeAddToDraftFlight = async () => {
        await dispatch(addShipToFlight(ship.id))
        await dispatch(fetchShips({}))
    }


    return (
        <Card key={ship.id} style={{ width: '18rem', margin: "0 auto 50px", height: "calc(100% - 50px)" }}>
            <CardImg
                src={dest_img === "img-proxy"
                    ? (isMock ? mockImage as string : ship.image)
                    : ship.image.replace("localhost", "172.20.10.11")}
                style={{ "height": "300px" }}
            />
            <CardBody className="d-flex flex-column justify-content-between">
                <CardTitle tag="h5">
                    {ship.name}
                </CardTitle>
                <CardText>
                    Дата изготовления: {ship.creation_date}
                </CardText>
                <div className="d-flex justify-content-between">
                    <Link to={`/ships/${ship.id}`}>
                        <Button color="primary">
                            Открыть
                        </Button>
                    </Link>
                    {showAddBtn &&
                        <Button color="primary" onClick={handeAddToDraftFlight}>
                            Добавить
                        </Button>
                    }
                </div>
            </CardBody>
        </Card>
    );
};

export default ShipCard