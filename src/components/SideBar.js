export default function SideBar({ $target, initialState }) {
  const $sideBar = document.createElement('nav');
  $target.appendChild($sideBar);

  this.state = initialState;
  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { username, documents } = this.state;
    $sideBar.innerHTML = `
      <header>${username}님, 안녕하세요!</header>
      <section>
        ${documents
          .map(({ id, title }) => {
            return `<div data-id="${id}">${title}</div>`;
          })
          .join('')}
      </section>
    `;
  };

  this.render();
}
