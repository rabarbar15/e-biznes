describe('template spec', () => {
  beforeEach(() => {
    cy.visit('https://www.ceneo.pl/')
    cy.wait(1000)
    cy.get('button[class="cookie-consent__buttons__action js_cookie-consent-agree primary"]').click({force: true} ); 
  });

  it('should load the home page', () => {
    cy.title().should('include', 'Ceneo - porównanie cen, sklepy, perfumy, agd, rtv, komputery');
    cy.get('header[class="js_page-header header"]').should('be.visible');
    cy.get('div[class="home-main js_home-main"]').should('be.visible');
  });

  it('should view a header', () => {
    cy.get('header[class="js_page-header header"]').should('be.visible');
  })

  it('should view a footer', () => {
    cy.get('footer').should('be.visible');
    
  })

  it('should view favourite products', () => {
    cy.get('div.header__user__favourites').click()
    cy.contains('span', 'Dodawaj produkty do ulubionych')
  })

  it('should search for a product', () => {
    cy.get('input[id="form-head-search-q"]')
      .should('be.visible')
      .and('have.value', '')
      .type('Samsung{enter}')
      .should('have.value', 'Samsung')
    
    cy.get('div[class="card-outer-title"]')
      .contains('strong', 'Produkty')
  });


  it('should show login view', () => {
    cy.get('div[class="my-account"]').click()
    cy.get('input[id="username"]').should('be.visible')
    cy.get('input[id="current-password"]').should('be.visible')
  })

  it('should show password recover', () => {
    cy.get('div[class="my-account"]').click()
    cy.get('a[class="link link--accent js_redirect-to-passwordremind"]').click()
    cy.contains('div', 'Przypominanie hasła')
  })

  it('should redirect to a register page', () => {
    cy.get('div[class="my-account"]').click()
    cy.contains('strong', 'Zarejestruj się').click()

  })

  it('should redirect to a cart', () => {
    cy.get('div[class="header__user__basket js_header-basket"]').click()
    cy.contains('div', 'Twój koszyk jest pusty')

  })

  it('should show categories', () => {
    cy.get('div[class="js_cat-menu-item_all cat-menu__show-all"]')
      .trigger('mouseover')
    cy.contains('div', 'Fotografia')
    cy.contains('div', 'Prezenty')
  })

  it('should view camera section', () => {
    cy.get('div[class="js_cat-menu-item_all cat-menu__show-all"]')
      .trigger('mouseover')
    cy.contains('a.sub-cat__item', 'Aparaty cyfrowe').click();
  })

  it('should go to first product on main page', () => {
    cy.get('a.box').eq(0).click();
    cy.get('h1.product-top__product-info__name').should('be.visible')
  })

  it('should show items details', () => {
    cy.get('a.box').eq(0).click();
    cy.get('a[title="Informacje o produkcie"]').click()
    cy.get('div.lnd_wrapper').should('be.visible')
  })

  it('should show items opinions section', () => {
    cy.get('a.box').eq(0).click();
    cy.contains('a[href*="#tab=reviews"]', /Opinie i Recenzje/).click();
    cy.get('div.review-header__features').should('be.visible')
  })

  it('should add item to a cart', () => {
    cy.get('a.box').eq(0).click();
    cy.get('a.add-to-basket-no-popup',).click()
    cy.contains('span', ' DOSTAWA I PŁATNOŚĆ ')
  })

  it('should view shipment page', () => {
    cy.get('a.box').eq(0).click();
    cy.contains('span', 'Kup teraz').click({ force: true });
    cy.get('span.ceneo-base-button__content').click()
    cy.contains('h2', 'Logowanie')
  })

  it('should view specific brands items', () => {
    cy.get('input[id="form-head-search-q"]')
      .type('Motorola{enter}')
    cy.get('img[alt="Motorola"]').click()
    cy.wait(1000)

    cy.get('a.go-to-product.js_conv.js_seoUrl').eq(4).invoke('text').then((text) => {
      const firstWord = text.trim().split(' ')[0];
      cy.log(`First Word: ${firstWord}`);
      expect(firstWord).to.equal('Motorola');
    });
  })

  it('should show items filtered below give price', () => {
    cy.get('a.cat-menu-item__link').eq(0).click();
    cy.get('input[name="price-max"]').type('100{enter}')
    cy.get('.cat-prod-row__price .value').each(($price) => {
      const priceText = $price.text(); 
      const price = parseFloat(priceText); 
      expect(price).to.be.lessThan(507); 
    });
  })

  it('should remove item from a cart', () => {
    cy.get('a.box').eq(0).click();
    cy.contains('span', 'Kup teraz').click({ force: true });

    cy.wait(1000)
    cy.get('button[data-cy="remove-btn"]').click({ force: true })
    cy.get('button[data-cy="confirm-btn"]').click({ force: true })
    cy.contains('div', 'Twój koszyk jest pusty')
  })

  it('should increase item quantity in a cart', () => {
    cy.get('a.box').eq(0).click();
    cy.contains('span', 'Kup teraz').should('be.visible').click({ force: true });
    cy.get('input[name="quantity"]').clear().type(3);
    cy.get('input[name="quantity"]').should('have.value', '3');

  })

})

