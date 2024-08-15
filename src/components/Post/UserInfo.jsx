import moment from "moment/moment";
import 'moment/locale/tr'

const UserInfo = ({tweet}) => {

const date = moment(tweet.createdAt?.toDate()).fromNow()

  return (
    <div className='flex gap-3 items-center  whitespace-nowrap'>
      <p>{tweet.user.name}</p>
      <p className='text-gray-400 text-sm' >@{tweet.user.name.toLowerCase().replace(/ /g,'_')}</p>
      <p className='text-gray-400 text-sm'>{date}</p>
      {tweet.isEdited && <p className='text-gray-400 text-sm'>*düzenlendi</p>}
    </div>
  )
}

export default UserInfo