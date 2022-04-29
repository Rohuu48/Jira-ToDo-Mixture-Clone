import { render, fireEvent, screen } from "../../@local-react-testing-library";
import DrawerContainer from "../Drawer";

describe("<Drawer/>", () => {
  const wrapper = <DrawerContainer />;
  it("renders the drawer component", () => {
    const { container } = render(wrapper);
    expect(container).toMatchSnapshot();
  });
  it("should contain a settings button", () => {
    render(wrapper);
    expect(screen.getByTestId("settings-button")).toBeVisible();
  });
  describe("Closed Drawer", () => {
    beforeEach(() => {
      render(wrapper);
    });

    it("should not show drawer header", () => {
      expect(screen.queryByText("Tasker App")).toBeNull();
    });
    it("should not show toggle mode switch", () => {
      expect(screen.queryByText("Toggle light/dark mode")).toBeNull();
      expect(screen.queryByTestId("toggle-switch")).toBeNull();
    });
  });
  describe("Open Drawer", () => {
    beforeEach(() => {
      const container = render(wrapper);
      fireEvent.click(container.getByTestId("settings-button"));
    });

    it("should show drawer header", () => {
      expect(screen.getByText("Tasker App")).toBeVisible();
    });
    it("should show toggle mode switch", () => {
      expect(screen.getByText("Toggle light/dark mode")).toBeVisible();
      expect(screen.getByTestId("toggle-switch")).toBeVisible();
    });
    describe("Toggle Switch", () => {
      //   beforeEach(() => {
      //     const container = render(wrapper);
      //     fireEvent.change(container.getByTestId('toggle-switch'));
      //   });
    });
  });
});
