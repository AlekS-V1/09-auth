'use client';

import { useEffect, useState } from 'react';
import css from './EditProfilePage.module.css';
import Image from 'next/image';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

const EditProfile = () => {
  const [username, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  // const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.username ?? '');
      setAvatar(user.avatar ?? '');
      setEmail(user.email ?? '');
    });
  }, []);

  const handleCancel = () => router.push('/profile');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await updateMe({
      username,
      email,
    });
    if (res) {
      handleCancel();
    }
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {avatar && (
          <Image
            src={avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {username}</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleChange}
              className={css.input}
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
