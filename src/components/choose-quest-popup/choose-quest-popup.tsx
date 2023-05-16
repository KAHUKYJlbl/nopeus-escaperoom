import classes from './choose-quest-popup.module.sass'

import { BookingInfo } from '../../types/booking/booking';

type ChooseQuestPopupProps = {
  onQuestChoose: (arg: string) => void;
  popupQuests: BookingInfo[];
  onCloseButtonClick: () => void
}

export default function ChooseQuestPopup ({onQuestChoose, popupQuests, onCloseButtonClick}: ChooseQuestPopupProps): JSX.Element {
  return (
    <div className={classes.wrapper}>
      <div className={classes.closeButton} onClick={() => onCloseButtonClick()}>X</div>
      <label className={classes.listLabel}>Квестов по этому адресу: {popupQuests.length}</label>

      <ul className={classes.list}>
        {popupQuests.map((quest, index) =>
          <li
            key={quest.id}
            onClick={() => onQuestChoose(quest.id)}
            className={classes.listItem}
          >
            {`выбрать квест ${index + 1}`}
          </li>
        )}
      </ul>
    </div>

  );
}
