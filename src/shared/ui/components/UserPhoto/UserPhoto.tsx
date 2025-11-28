import s from './UserPhoto.module.css';

type UserPhotoProps = {
  src?: string;
  className?: string;
};

export const UserPhoto = ({ src, className = '' }: UserPhotoProps) => {
  return (
    <div className={`${s.userPhoto} ${className}`}>
      {src ? <img src={src} alt='User' className={s.photo} /> : <div className={s.placeholder}></div>}
    </div>
  );
};
