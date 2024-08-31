import PrivateRoute from "@/routes/PrivateRoute";
import Addresses from "../../components/form/address";

export default function AddAddressLayout() {
    return (
        <PrivateRoute>
            <Addresses />
        </PrivateRoute>
    );
}