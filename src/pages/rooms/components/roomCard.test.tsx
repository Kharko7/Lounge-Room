import { fireEvent, render, screen } from "@testing-library/react";
import RoomCard from "./RoomCard";

const onClick = jest.fn(() => {});
const mokeData = {
  name: "room1",
  floor: 1,
  equipment: {
    projector: true,
    TV: false,
  },

  capacity: "2-8",
};

beforeEach(() => {
  render(<RoomCard data={mokeData} />);
});

describe("RoomCard tests", () => {
  it("RoomCard should  be defined", () => {
    const roomElement = screen.getByTestId("room-card");
    expect(roomElement).toBeDefined();
  });
  it("Room name should be defined", () => {
    const roomNameElement = screen.getByText(mokeData.name);
    expect(roomNameElement).toBeDefined();
  });
  it("Room capacity should be defined", () => {
    const roomCapacityElement = screen.getByText(mokeData.capacity);
    expect(roomCapacityElement).toBeDefined();
  });
  it("Room equipment should be defined", () => {
    const TVElement = screen.queryByTestId("icoTV");
    expect(TVElement).toBe(null);
    const projectorElement = screen.queryByTestId("icoProjector");
    expect(projectorElement).toBeDefined();
  });

  describe("work with info", () => {
    it("clicking on the information icon should show the nearest bookings for the room", () => {
      const info = screen.getByTestId("info-button");
      fireEvent.click(info);
      const infoBox = screen.getByTestId("info-box");
      expect(infoBox).toBeDefined();
    });
    it("clicking on the information icon again should remove the nearest bookings", () => {
      const info = screen.getByTestId("info-button");
      fireEvent.click(info);
      fireEvent.click(info);
    });
  });

});
