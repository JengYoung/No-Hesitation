import Modal from '@/components/common/Modal';
import names from '@/utils/classNames';
import { ERROR_STATUS } from '@/utils/constants';

//
export const renderModalByEvent = ({ head, isInput, tryFunc }) => {
  const { container } = names;
  const $app = document.querySelector('#app');
  const modal = new Modal({
    $target: document.querySelector('#app'),
    head,
    isInput,
    onConform: async content => {
      try {
        await tryFunc(isInput && content);
      } catch (e) {
        console.error(e);
        alert(ERROR_STATUS, e);
      } finally {
        if ($app.querySelector(`.${container}`)) {
          $app.removeChild(modal.$container);
        }
      }
    },
  });
  modal.render();
};
