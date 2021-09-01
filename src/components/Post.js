import { API_END_POINT } from '../utils/constants.js';

/*
  id, title
*/
export default function Post({ $target, initialState }) {
  this.state = initialState;
  this.$post = document.createElement('a');

  this.render = () => {
    this.$post.classList.add('post');
    this.$post.setAttribute('href', `${API_END_POINT}/${this.state.id}`);
    this.$post.textContent = this.state.title;

    $target.appendChild(this.$post);
  };
  this.render();
}
