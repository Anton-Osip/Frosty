import s from './Error.module.css';
import { BrandLogo, TelegramIcon } from '../../shared/ui/icons';
import { Button } from '../../shared/ui/components';

export const Error = () => {
  const handleTelegramClick = () => {
    // Логика для открытия Telegram
    window.open('https://t.me/frosted', '_blank');
  };

  return (
    <div className={s.error}>
      <div className={s.icon}>
        <BrandLogo />
      </div>
      <h2 className={s.title}>Ошибка доступа!</h2>
      <p className={s.message}>Перезапустите мини-приложение</p>
      <Button
        onClick={handleTelegramClick}
        variant='dark'
        width='170px'
        height='39px'
        borderRadius={10}
        className={s.telegramButton}
      >
        <TelegramIcon size={20} />
        <span>Frosty Casino</span>
      </Button>
    </div>
  );
};
