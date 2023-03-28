import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  addprofileAsync, updprofileasync, getprofileAsync, selectProfile, selectRefresh

} from '../features/Profile/profileSlice';
import { selectAccess } from '../features/login/loginSlice'
import styles from './Counter.module.css';
import { CompletionTriggerKind } from 'typescript';

function Profile() {

  const access = useAppSelector(selectAccess);
  const profile = useAppSelector(selectProfile);
  const refresh = useAppSelector(selectRefresh);
  const dispatch = useAppDispatch();
  const [bio, setbio] = useState("")
  const [location, setlocation] = useState("")
  const [birth_date, setbirth_date] = useState("")

  useEffect(() => {
    dispatch(getprofileAsync(access))
  }, [refresh])




  return (
    <div>
      <br></br>
      <h1>My profile:</h1>

      {profile.length > 0 ? profile.map((profile, i) => <div key={i}>
        bio : {profile.bio} , birth_date :{profile.birth_date}, location:{profile.location}
        <button onClick={() => dispatch(updprofileasync({ bio, location, birth_date, access, id: profile.id }))}>Update profile</button>
      </div>) : <h3>please add information to your profile </h3>}

      <br></br>
      bio: <input onChange={(e) => setbio(e.target.value)}></input>
      location: <input onChange={(e) => setlocation(e.target.value)}></input>
      birth_date: <input type={'date'} onChange={(e) => setbirth_date(e.target.value)}></input>
      <button onClick={() => dispatch(addprofileAsync({ bio, location, birth_date, access }))}>Add profile</button>

    

      <ToastContainer />

    </div>
  );
}

export default Profile;