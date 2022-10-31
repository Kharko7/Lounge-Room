import { useState } from "react";
import styles from "../rooms.module.scss";
import cn from "classnames";
import ModalRooms from "./ModalRooms";

interface MyroomsData {
  data: data;
  key: number;
}
interface data {
  name: string;
  floor: number;
  equipment: {
    projector: boolean;
    TV: boolean;
  };
  capacity: string;
}
const RoomCard = ({
  data,
}: // key
MyroomsData) => {
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const ToggleInfo = () => {
    if (!openInfo) {
      let scroll = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scroll}px`;
      console.log(scroll);
    } else {
      document.body.style.position = "static";
      const top = document.body.style.top;
      document.body.style.top = "";
      //@ts-ignore
      window.scrollTo(0, parseInt(top || 0) * -1);
    }
  };

  return (
    <div className={styles.card} data-info={openInfo}>
      <div
        className={
          openInfo
            ? cn(styles.roomCardContainer, styles.infoChoose)
            : styles.roomCardContainer
        }
        onClick={() => {
          setOpen(true);
          setOpenInfo(false);
        }}
      >
        <div className={styles.headerRoomCard}>
          <span className={styles.labelRoomName}>{data.name}</span>
          <span className={styles.indicator}></span>
        </div>
        <div className={styles.roomInfo}>
          {data.equipment.projector && (
            <div className={styles.projectorIco}></div>
          )}
          {data.equipment.TV && <div className={styles.tvIco}></div>}
          <span className={styles.capacityLabel}>
            {data.capacity}
            <div className={styles.membersIco}></div>
          </span>
          <span
            className={styles.info}
            onClick={(event) => {
              setOpenInfo((prev) => !prev);
              ToggleInfo();
              event.stopPropagation();
            }}
          >
            <svg
              className={styles.svg}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M13 16h-2v-6h2v6zm-1-10.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25zm0-2.75c5.514 0 10 3.592 10 8.007 0 4.917-5.145 7.961-9.91 7.961-1.937 0-3.383-.397-4.394-.644-1 .613-1.595 1.037-4.272 1.82.535-1.373.723-2.748.602-4.265-.838-1-2.025-2.4-2.025-4.872-.001-4.415 4.485-8.007 9.999-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.738 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.418.345 2.775.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006z" />
            </svg>
          </span>
        </div>
      </div>
      <span
        data-info={openInfo}
        className={styles.infoBox}
        onMouseEnter={(event) => {
          event?.preventDefault();
        }}
      >
        <span className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eligendi
          dolorum neque
          <div className={styles.btn} onClick={() =>{ setOpen(true);setOpenInfo(false)}}>
            To book
          </div>
        </span>
      </span>
      {open && <ModalRooms floor={data.floor.toString()} name={data.name.toString()} closeModal={setOpen}></ModalRooms>}
      <div className={cn(openInfo && styles.blur)}></div>
    </div>
  );
};
export default RoomCard;
