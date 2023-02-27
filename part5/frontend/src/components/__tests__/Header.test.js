import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import Header from "../../components/Header";

test("Header to have correct text", () => {
    const { container } = render(<Header />);
    const headerTag = container.getElementsByTagName("h1")[0]
    expect(headerTag.innerHTML).toEqual('To-Do App')
    expect(screen.getByText('To-Do App')).toBeInTheDocument()
});