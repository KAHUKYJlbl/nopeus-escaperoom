import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../types/state/state';

export const useAppDispatch = () => useDispatch<AppDispatch>();
