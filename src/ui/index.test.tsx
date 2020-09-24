import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";

test("shows header element with `Let's play!` text", () => {
  const text = "Let's play!";

  render(<h1>{text}</h1>);

  expect(screen.getByText(text)).toBeInTheDocument();
});
