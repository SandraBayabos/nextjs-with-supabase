import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  it("renders the button with provided text", () => {
    render(<Button>Click me</Button>);

    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("applies custom className if provided", () => {
    render(<Button className="custom-class">Click me</Button>);

    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toHaveClass("custom-class");
  });

  it("has default className if none provided", () => {
    render(<Button data-testid="test-button">Click me</Button>);
    const buttonElement = screen.getByTestId("test-button");
    expect(buttonElement).toHaveClass(
      "text-slate-100 bg-gradient-to-tr from-sky-300 to-sky-500 rounded-md py-2 px-3"
    );
  });

  it("has extra props passed into it", () => {
    render(
      <Button data-testid="test-button" aria-label="test button">
        Click me
      </Button>
    );

    const buttonElement = screen.getByTestId("test-button");
    expect(buttonElement).toHaveAttribute("aria-label", "test button");
  });

  it("fires onClick event when clicked", () => {
    const handleClick = jest.fn();
    render(
      <Button data-testid="test-button" onClick={handleClick}>
        Click me
      </Button>
    );

    const buttonElement = screen.getByTestId("test-button");
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
