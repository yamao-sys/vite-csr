import { render, screen } from "@testing-library/react";
import { BaseLayout } from ".";

describe("pages/auth/sign_up/organisms/BaseLayout", () => {
  test("子要素が表示されること", () => {
    render(
      <BaseLayout>
        <div>test</div>
      </BaseLayout>,
    );

    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
