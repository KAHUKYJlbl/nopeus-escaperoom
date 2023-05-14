
import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';
import { fetchQuestById, fetchQuests } from '../../store/quest/api-actions';

import classes from './oops.module.css';
import { AppRoute } from '../../const';

type OopsProps = {
  type: 'main' | 'quest' | 'favorites' | 'error-boundary';
  arg?: string;
}

export default function Oops({type, arg}: OopsProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleOopsClick = () => {
    switch (type) {
      case 'main':
        dispatch(fetchQuests());
        break;
      // case 'favorites':
      //   dispatch(fetchFavorites());
      //   break;
      case 'quest':
        dispatch(fetchQuestById(arg));
        break;
      case 'error-boundary':
        return <Navigate to={AppRoute.Main} />
    }
  };

  return (
    <div className={classes.containeroops} onClick={handleOopsClick}>
      <figure className={classes.figureoops}>
        <figcaption className={classes.figcaptionoops} title="Try again">
          <span className={classes.o}></span>
          <span className={classes.o}></span>
          <span className={classes.p}></span>
          <span className={classes.s}></span>
          <span className={classes.wow}></span>
        </figcaption>
      </figure>
    </div>
  );
}
