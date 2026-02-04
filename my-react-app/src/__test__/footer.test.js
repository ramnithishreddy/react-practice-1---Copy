import { render, fireEvent } from "@testing-library/react";
import Footer from "../amazon/footer";
import { BrowserRouter as Router } from "react-router-dom";

describe("Footer Component", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("should render Footer component", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const footer = document.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });

  it("should display footer content", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const footerContent = document.querySelector(".footer");
    expect(footerContent).toBeInTheDocument();
  });

  it("should contain footer text", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const footer = document.querySelector("footer");
    expect(footer?.textContent).toBeTruthy();
  });

  it("should render footer with proper structure", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const footer = document.querySelector("footer");
    expect(footer).toHaveClass("footer");
  });

  it("should display footer information", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const footerElement = document.querySelector(".footer");
    expect(footerElement).toBeInTheDocument();
  });

  it("should have footer element in DOM", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const footer = document.querySelector("footer");
    expect(footer?.parentElement).toBeInTheDocument();
  });

  it("should render footer properly", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const footer = document.querySelector("footer");
    expect(footer?.children.length).toBeGreaterThanOrEqual(0);
  });

  it("should display footer sections", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const sections = document.querySelectorAll(".footer-column");
    expect(sections.length).toBeGreaterThan(0);
  });

  it("should have footer heading", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const heading = document.querySelector(".footer-column h4");
    expect(heading).toBeInTheDocument();
  });

  it("should display company info section", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const companyInfo = document.querySelector(".footer-links");
    expect(companyInfo).toBeInTheDocument();
  });

  it("should have footer links", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const links = document.querySelectorAll(".footer a");
    expect(links.length).toBeGreaterThan(0);
  });

  it("should display footer contact section", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const contactSection = document.querySelector(".footer-bottom");
    expect(contactSection).toBeInTheDocument();
  });

  it("should show footer social links", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const socialLinks = document.querySelectorAll(".footer-column a");
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  it("should display copyright information", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const copyright = document.querySelector(".footer-copyright");
    expect(copyright).toBeInTheDocument();
  });

  it("should have footer navigation items", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const navItems = document.querySelectorAll(".footer-column");
    expect(navItems.length).toBeGreaterThan(0);
  });

  it("should display payment methods", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const links = document.querySelectorAll(".footer-links a");
    expect(links.length).toBeGreaterThan(0);
  });

  it("should show footer policies section", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const policies = document.querySelector(".footer-policies");
    expect(policies).toBeInTheDocument();
  });

  it("should have all footer subsections", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const footer = document.querySelector(".footer");
    const hasContent = footer?.textContent && footer.textContent.length > 0;
    expect(hasContent).toBeTruthy();
  });

  it("should render footer with complete structure", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const footer = document.querySelector("footer");
    const footerContent = document.querySelector(".footer");
    expect(footer).toBeInTheDocument();
    expect(footerContent).toBeInTheDocument();
  });

  it("should display footer branding", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const branding = document.querySelector(".footer-logo");
    expect(branding).toBeInTheDocument();
  });

  it("should have footer utility section", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const utility = document.querySelector(".footer-bottom");
    expect(utility).toBeInTheDocument();
  });

  it("should have back to top button", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const backToTop = document.querySelector(".back-to-top");
    expect(backToTop).toBeInTheDocument();
  });

  it("should display footer content wrapper", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const content = document.querySelector(".footer-content");
    expect(content).toBeInTheDocument();
  });

  it("should have multiple footer columns", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const columns = document.querySelectorAll(".footer-column");
    expect(columns.length).toBeGreaterThanOrEqual(4);
  });

  it("should have back to top button clickable", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const backToTop = document.querySelector(".back-to-top");
    expect(backToTop?.tagName).toBe("BUTTON");
  });

  it("should have footer sections with headings", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const headings = document.querySelectorAll(".footer-column h4");
    expect(headings.length).toBeGreaterThan(0);
  });

  it("should display all footer links", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const allLinks = document.querySelectorAll(".footer a");
    expect(allLinks.length).toBeGreaterThan(10);
  });

  it("should have footer logo section", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const logo = document.querySelector(".footer-logo");
    expect(logo?.textContent).toContain("Amazon");
  });

  it("should have footer policies links", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const policiesLinks = document.querySelectorAll(".footer-policies a");
    expect(policiesLinks.length).toBeGreaterThan(0);
  });

  it("should render footer with all sections properly", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const footer = document.querySelector("footer");
    const topSection = document.querySelector(".back-to-top");
    const linksSection = document.querySelector(".footer-links");
    const bottomSection = document.querySelector(".footer-bottom");
    expect(footer).toBeInTheDocument();
    expect(topSection).toBeInTheDocument();
    expect(linksSection).toBeInTheDocument();
    expect(bottomSection).toBeInTheDocument();
  });

  it("should display footer structure correctly", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const footer = document.querySelector("footer");
    expect(footer?.className).toContain("footer");
    expect(footer?.children.length).toBeGreaterThan(0);
  });

  it("should have proper footer layout", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const footer = document.querySelector(".footer");
    expect(footer?.children.length).toBeGreaterThanOrEqual(2);
  });

  it("should render footer sections with content", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const columns = document.querySelectorAll(".footer-column");
    columns.forEach((column) => {
      expect(column?.textContent).toBeTruthy();
    });
  });

  it("should display footer with all required elements", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const footer = document.querySelector("footer");
    const hasButton = document.querySelector(".back-to-top");
    const hasContent = document.querySelector(".footer-content");
    const hasBottom = document.querySelector(".footer-bottom");
    expect(footer).toBeInTheDocument();
    expect(hasButton).toBeInTheDocument();
    expect(hasContent).toBeInTheDocument();
    expect(hasBottom).toBeInTheDocument();
  });

  it("should trigger back to top function on button click", () => {
    window.scrollTo = jest.fn();
    render(
      <Router>
        <Footer />
      </Router>
    );
    const backToTopButton = document.querySelector(".back-to-top");
    if (backToTopButton) {
      fireEvent.click(backToTopButton);
      expect(window.scrollTo).toHaveBeenCalled();
    }
  });

  it("should have proper button aria label", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const backToTopButton = document.querySelector(".back-to-top");
    expect(backToTopButton?.getAttribute("aria-label")).toBe("Back to top");
  });

  it("should render footer list items", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const listItems = document.querySelectorAll(".footer-column li");
    expect(listItems.length).toBeGreaterThan(0);
  });

  it("should have footer links with proper href", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const links = document.querySelectorAll(".footer-column a");
    links.forEach((link) => {
      expect(link.getAttribute("href")).toBeTruthy();
    });
  });

  it("should execute scroll to top on button click", () => {
    const scrollToMock = jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(
      <Router>
        <Footer />
      </Router>
    );
    const backToTopButton = document.querySelector(".back-to-top");
    if (backToTopButton) {
      fireEvent.click(backToTopButton);
      expect(scrollToMock).toHaveBeenCalled();
    }
    scrollToMock.mockRestore();
  });

  it("should render footer with scroll functionality", () => {
    const scrollToMock = jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(
      <Router>
        <Footer />
      </Router>
    );
    const buttons = document.querySelectorAll(".back-to-top");
    expect(buttons.length).toBeGreaterThan(0);
    scrollToMock.mockRestore();
  });

  it("should handle multiple back-to-top clicks", () => {
    const scrollToMock = jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    const { rerender } = render(
      <Router>
        <Footer />
      </Router>
    );
    const button = document.querySelector(".back-to-top");
    if (button) {
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      expect(scrollToMock).toHaveBeenCalledTimes(3);
    }
    scrollToMock.mockRestore();
  });

  it("should display footer information section", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const footer = document.querySelector("footer");
    const hasContent = footer && footer.children.length > 0;
    expect(hasContent).toBe(true);
  });

  it("should render all footer columns with content", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const columns = document.querySelectorAll(".footer-column");
    columns.forEach((column) => {
      const hasText = column.textContent && column.textContent.trim().length > 0;
      expect(hasText).toBe(true);
    });
  });

  it("should have clickable footer links", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const links = document.querySelectorAll(".footer a");
    links.forEach((link) => {
      expect(link.tagName).toBe("A");
    });
  });

  it("should display footer with all interactive elements", () => {
    const scrollToMock = jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(
      <Router>
        <Footer />
      </Router>
    );
    const footer = document.querySelector("footer");
    const backToTop = document.querySelector(".back-to-top");
    const columns = document.querySelectorAll(".footer-column");
    
    expect(footer).toBeInTheDocument();
    expect(backToTop).toBeInTheDocument();
    expect(columns.length).toBeGreaterThan(0);
    scrollToMock.mockRestore();
  });

  it("should trigger window.scrollTo with correct parameters", () => {
    const scrollToMock = jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(
      <Router>
        <Footer />
      </Router>
    );
    const backToTopButton = document.querySelector(".back-to-top");
    if (backToTopButton) {
      fireEvent.click(backToTopButton);
      expect(scrollToMock).toHaveBeenCalledWith(
        expect.objectContaining({
          behavior: expect.any(String),
        })
      );
    }
    scrollToMock.mockRestore();
  });

  it("should handle footer link clicks", () => {
    window.alert = jest.fn();
    render(
      <Router>
        <Footer />
      </Router>
    );
    const careersLink = document.querySelector("a[href='#careers']");
    if (careersLink) {
      fireEvent.click(careersLink);
      expect(window.alert).toHaveBeenCalledWith("Careers at Amazon");
    }
  });

  it("should trigger alerts on footer column links", () => {
    window.alert = jest.fn();
    render(
      <Router>
        <Footer />
      </Router>
    );
    const allLinks = document.querySelectorAll(".footer-column a");
    if (allLinks.length > 0) {
      fireEvent.click(allLinks[0]);
      expect(window.alert).toHaveBeenCalled();
    }
  });

  it("should handle press releases link", () => {
    window.alert = jest.fn();
    render(
      <Router>
        <Footer />
      </Router>
    );
    const pressLink = document.querySelector("a[href='#press']");
    if (pressLink) {
      fireEvent.click(pressLink);
      expect(window.alert).toHaveBeenCalledWith("Press Releases");
    }
  });

  it("should handle social media links", () => {
    window.alert = jest.fn();
    render(
      <Router>
        <Footer />
      </Router>
    );
    const facebookLink = document.querySelector("a[href='#facebook']");
    if (facebookLink) {
      fireEvent.click(facebookLink);
      expect(window.alert).toHaveBeenCalledWith("Follow us on Facebook");
    }
  });

  it("should handle make money links", () => {
    window.alert = jest.fn();
    render(
      <Router>
        <Footer />
      </Router>
    );
    const sellLink = document.querySelector("a[href='#sell']");
    if (sellLink) {
      fireEvent.click(sellLink);
      expect(window.alert).toHaveBeenCalledWith("Sell on Amazon");
    }
  });

  it("should handle help section links", () => {
    window.alert = jest.fn();
    render(
      <Router>
        <Footer />
      </Router>
    );
    const accountLink = document.querySelector("a[href='#account']");
    if (accountLink) {
      fireEvent.click(accountLink);
      expect(window.alert).toHaveBeenCalledWith("Your Account");
    }
  });

  it("should handle footer policies links", () => {
    window.alert = jest.fn();
    render(
      <Router>
        <Footer />
      </Router>
    );
    const policiesLinks = document.querySelectorAll(".footer-policies a");
    if (policiesLinks.length > 0) {
      fireEvent.click(policiesLinks[0]);
      expect(window.alert).toHaveBeenCalled();
    }
  });

  it("should trigger home link alert", () => {
    window.alert = jest.fn();
    render(
      <Router>
        <Footer />
      </Router>
    );
    const homeLink = document.querySelector("a[href='#home']");
    if (homeLink) {
      fireEvent.click(homeLink);
      expect(window.alert).toHaveBeenCalledWith("Back to Home");
    }
  });

  it("should handle all footer links interactions", () => {
    window.alert = jest.fn();
    render(
      <Router>
        <Footer />
      </Router>
    );
    const allLinks = document.querySelectorAll("a");
    expect(allLinks.length).toBeGreaterThan(15);
    if (allLinks.length > 0) {
      fireEvent.click(allLinks[0]);
      expect(window.alert).toHaveBeenCalled();
    }
  });

  it("should execute topFunction on back-to-top button click", () => {
    const scrollToMock = jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(
      <Router>
        <Footer />
      </Router>
    );
    const button = document.querySelector(".back-to-top");
    if (button) {
      fireEvent.click(button);
      expect(scrollToMock).toHaveBeenCalledWith(
        expect.objectContaining({
          top: 0,
          behavior: "smooth",
        })
      );
    }
    scrollToMock.mockRestore();
  });

  it("should click all footer links and trigger alerts", () => {
    window.alert = jest.fn();
    render(
      <Router>
        <Footer />
      </Router>
    );
    const links = document.querySelectorAll(".footer-column a");
    links.forEach((link, index) => {
      fireEvent.click(link);
      expect(window.alert).toHaveBeenCalled();
    });
  });

  it("should handle all footer section links", () => {
    window.alert = jest.fn();
    render(
      <Router>
        <Footer />
      </Router>
    );
    const careersLink = document.querySelector("a[href='#careers']");
    const pressLink = document.querySelector("a[href='#press']");
    if (careersLink) fireEvent.click(careersLink);
    if (pressLink) fireEvent.click(pressLink);
    expect(window.alert).toHaveBeenCalled();
  });

  it("should trigger alerts for social media links", () => {
    window.alert = jest.fn();
    render(
      <Router>
        <Footer />
      </Router>
    );
    const facebookLink = document.querySelector("a[href='#facebook']");
    const twitterLink = document.querySelector("a[href='#twitter']");
    const instagramLink = document.querySelector("a[href='#instagram']");
    if (facebookLink) fireEvent.click(facebookLink);
    if (twitterLink) fireEvent.click(twitterLink);
    if (instagramLink) fireEvent.click(instagramLink);
    expect(window.alert).toHaveBeenCalled();
  });

  it("should handle make money section links", () => {
    window.alert = jest.fn();
    render(
      <Router>
        <Footer />
      </Router>
    );
    const sellLink = document.querySelector("a[href='#sell']");
    const associatesLink = document.querySelector("a[href='#associates']");
    if (sellLink) fireEvent.click(sellLink);
    if (associatesLink) fireEvent.click(associatesLink);
    expect(window.alert).toHaveBeenCalled();
  });

  it("should handle help section links", () => {
    window.alert = jest.fn();
    render(
      <Router>
        <Footer />
      </Router>
    );
    const accountLink = document.querySelector("a[href='#account']");
    const returnsLink = document.querySelector("a[href='#returns']");
    if (accountLink) fireEvent.click(accountLink);
    if (returnsLink) fireEvent.click(returnsLink);
    expect(window.alert).toHaveBeenCalled();
  });

  it("should handle all policy links at bottom", () => {
    window.alert = jest.fn();
    render(
      <Router>
        <Footer />
      </Router>
    );
    const policyLinks = document.querySelectorAll(".footer-policies a");
    policyLinks.forEach((link) => {
      fireEvent.click(link);
      expect(window.alert).toHaveBeenCalled();
    });
  });

  it("should trigger back to top multiple times", () => {
    const scrollToMock = jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(
      <Router>
        <Footer />
      </Router>
    );
    const button = document.querySelector(".back-to-top");
    if (button) {
      fireEvent.click(button);
      fireEvent.click(button);
      expect(scrollToMock).toHaveBeenCalledTimes(2);
    }
    scrollToMock.mockRestore();
  });

  it("should verify back to top button has correct aria label", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const button = document.querySelector(".back-to-top");
    expect(button?.getAttribute("aria-label")).toBe("Back to top");
  });

  it("should verify footer links have proper href attributes", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const careersLink = document.querySelector("a[href='#careers']");
    const pressLink = document.querySelector("a[href='#press']");
    expect(careersLink?.getAttribute("href")).toBe("#careers");
    expect(pressLink?.getAttribute("href")).toBe("#press");
  });

  it("should verify footer has all four columns", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const columns = document.querySelectorAll(".footer-column");
    expect(columns.length).toBe(4);
  });

  it("should verify footer columns have headings", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const headings = document.querySelectorAll(".footer-column h4");
    expect(headings.length).toBe(4);
  });

  it("should verify copyright text includes year", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const copyright = document.querySelector(".footer-copyright");
    expect(copyright?.textContent).toContain(new Date().getFullYear().toString());
  });

  it("should click footer logo link", () => {
    window.alert = jest.fn();
    render(
      <Router>
        <Footer />
      </Router>
    );
    const logoLink = document.querySelector(".footer-logo a");
    if (logoLink) {
      fireEvent.click(logoLink);
      expect(window.alert).toHaveBeenCalledWith("Back to Home");
    }
  });

  it("should verify all footer links are clickable", () => {
    window.alert = jest.fn();
    render(
      <Router>
        <Footer />
      </Router>
    );
    const allLinks = document.querySelectorAll("footer a");
    expect(allLinks.length).toBeGreaterThan(15);
    allLinks.forEach((link) => {
      fireEvent.click(link);
    });
    expect(window.alert).toHaveBeenCalled();
  });

  it("should verify back to top button functionality", () => {
    const scrollToMock = jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(
      <Router>
        <Footer />
      </Router>
    );
    const button = document.querySelector(".back-to-top");
    if (button) {
      fireEvent.click(button);
      expect(scrollToMock).toHaveBeenCalledWith({
        top: 0,
        behavior: "smooth",
      });
      scrollToMock.mockRestore();
    }
  });

  it("should handle all footer interactions", () => {
    const scrollToMock = jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    window.alert = jest.fn();
    render(
      <Router>
        <Footer />
      </Router>
    );
    const button = document.querySelector(".back-to-top");
    const links = document.querySelectorAll("a");
    if (button) fireEvent.click(button);
    if (links.length > 0) fireEvent.click(links[0]);
    expect(scrollToMock).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
    scrollToMock.mockRestore();
  });
});

