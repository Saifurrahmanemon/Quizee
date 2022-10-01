declare namespace Cypress {
  interface Chainable<Subject> {
    mount: (component: Element, alias?: string) => Chainable<void>;
  }
}

export {};
