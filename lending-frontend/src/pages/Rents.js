import { useEffect } from 'react'
import { useGetCurrentUser, useGetRentsByIds, useMakeRentRequest } from "../hooks/useCustomContract";
import MainLayout from "../layout/MainLayout"
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from "../redux/reducers/app";
import RentCard from '../components/RentCard';
import RentBorowingCard from '../components/RentBorowingCard'

export default function Rents() {
    const { data, write } = useMakeRentRequest();
    const { profile } = useSelector((state) => ({
        profile: state.app.profile
    }))

    const dispatch = useDispatch();
    const { refetch } = useGetCurrentUser(profile.userId);

    const myLendingsIds = profile?.myLendings?.map(id => Number(id)) || [];
    const myBorowingsIds = profile?.myBorrowings?.map(id => Number(id)) || [];

    const { data: myLendings } = useGetRentsByIds(myLendingsIds);
    const { data: myBorowings } = useGetRentsByIds(myBorowingsIds);

    const reloadRents = () => {
      refetch?.().then(res => {
          const newProfile = { products: [], ...res.data }
          if (!newProfile) return;

          newProfile.products = newProfile?.products.map(id => Number(id));
          dispatch(setProfile(newProfile));
      })
    }

    useEffect(() => {
      reloadRents();
    }, [])

    return (
      <MainLayout>
        <div className="container px-20">
          <h1 className="text-3xl">My Rent Requests</h1>
          <div
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {myLendings.map((rent, index) => (
              <RentCard rent={rent.result} reloadRents={reloadRents} />
            ))}
          </div>

          <h1 className="text-3xl mt-20">My Rents</h1>
          <div
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {myLendings.map((rent, index) => (
              <RentBorowingCard rent={rent.result} reloadRents={reloadRents} />
            ))}
          </div>
        </div>
      </MainLayout>
    );
}