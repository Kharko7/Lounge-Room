import styles from "../SideBar.module.scss";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "components/timePicker/styles/styles.module.scss";
import OwnBookings from "./OwnBookings";
import { ownBookingsActions } from "redux&saga/slices/ownBookings.slice";
import { useAppSelector, useAppDispatch } from "hooks/toolkitHooks";
import Loader from "pages/layout/loader/Loader";
import { flexbox } from "@mui/system";
interface booking {
  bookingId: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  isRecurring: boolean;
  creatorId_FK: number;
  room_FK: number;
}
export interface InitialStateBookig {
  bookings: Array<booking> | [];
}

const OwnBookingsContainer = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const totalCount = useAppSelector((state) => state.ownBookings.totalCount);
  const limit = useAppSelector((state) => state.ownBookings.limit);
  const pages = Math.ceil(totalCount / limit);
  const dispatch = useAppDispatch();
  console.log(totalCount, limit);
  const handleNext = () => {
    if (page + 1 <= pages) {
      setPage((prev) => prev + 1);
      dispatch(ownBookingsActions.getOwnBookings(page + 1));
    } else {
      setHasMore(false);
    }
  };
  useEffect(() => {
    dispatch(ownBookingsActions.getTotal(1));
  }, []);

  return (
    <div className={styles.myRoomsContainer} data-testid="my-rooms">
      <p className={styles.labelMyRooms}>my bookings</p>

      <InfiniteScroll
        height="50vh"
        dataLength={page}
        endMessage={<p></p>}
        next={() => handleNext()}
        hasMore={hasMore}
        className={styles.scroll}
        scrollThreshold="100%"
        loader={
          <div style={{display:"flex",justifyContent:"center" }}>
            <Loader size="small"></Loader>
          </div>
        }
      >
        <div className={styles.roomsCardsContainer}>
          {/* <MyRoomCard mockedData={mockedData}></MyRoomCard> */}
          <OwnBookings></OwnBookings>
        </div>
      </InfiniteScroll>
    </div>
  );
};
export default OwnBookingsContainer;
