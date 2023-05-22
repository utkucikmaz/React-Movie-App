describe("Search Engine", () => {
    it("show 404 text if there is no result", () => {
        cy.visit("http://localhost:3000/");
        cy.get('[data-cy="searchInput"]').type("the budhapeshte hotel");
        cy.contains(
            "We are deeply sorry to inform you that there is no movie under this name..."
        );
    });
    it("shows error message if there is no user in the records", () => {
        cy.visit("http://localhost:3000/login");
        cy.get('[data-cy="loginEmail"]').type("xxxxxx@gmail.com");
        cy.get('[data-cy="loginPassword"]').type("123456789");
        cy.get('[type="submit"]').click();
    });
    it("if there is user in the records", () => {
        cy.visit("http://localhost:3000/login");
        cy.get('[data-cy="loginEmail"]').type("utkucikmaz@gmail.com");
        cy.get('[data-cy="loginPassword"]').type("123456");
        cy.get('[type="submit"]').click();
    });
    it("if the user adds a movie to Favorites", () => {
        cy.visit("http://localhost:3000/");
        cy.get('[data-cy="searchInput"]').type(
            "making the billion dollar code"
        );
        cy.get('[data-cy="FavTest"]');
        cy.get("[id^=FavTestId]").click({ multiple: true });
    });
    it("if the user deletes the movies from Favorites", () => {
        cy.visit("http://localhost:3000/favorites");
        cy.get('[data-cy="FavTest"]');
        cy.get("[id^=FavTestId]").click({ multiple: true });
    });
});
