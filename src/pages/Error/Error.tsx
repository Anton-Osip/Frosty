import s from './Error.module.css';
import { BrandLogo } from '../../shared/ui/icons';
import { Button } from '../../shared/ui/components';
import { useErrorPageStore } from '../../shared/stores';

export const Error = () => {
  const { title, description, button } = useErrorPageStore();

  return (
    <div className={s.error}>
      <div className={s.icon}>
        <BrandLogo />
      </div>
      <h2 className={s.title}>{title}</h2>
      <p className={s.message}>{description}</p>
      <Button
        onClick={button.onClick}
        variant='dark'
        width='170px'
        height='39px'
        borderRadius={10}
        className={s.telegramButton}
      >
        {button.icon}
        {button.label}
      </Button>
    </div>
  );
};
