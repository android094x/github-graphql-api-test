import Image from 'next/image'
import { FiUsers } from 'react-icons/fi'
import { BsDot } from 'react-icons/bs'

type UserInfoProps = {
  [key: string]: { value: string }
}

const UserInfo = ({
  avatarUrl,
  bio,
  company,
  email,
  followers,
  following,
  username,
  name,
}: UserInfoProps) => {
  return (
    <div className='flex flex-col w-full lg:w-2/5 xl:w-1/4 items-center'>
      <figure className='relative w-80 h-80 mb-6'>
        <Image
          src={`${avatarUrl}`}
          layout='fill'
          objectFit='cover'
          className='rounded-full'
          alt={`${name} avatar image`}
        />
      </figure>
      <div className='flex flex-col w-4/5'>
        <div className='mb-3'>
          <p className='font-bold text-xl'>{name}</p>
          <p className='italic text-lg'>@{username}</p>
          <p className='text-lg'>{email}</p>
        </div>
        <div className='border-t border-gray-50 py-6 flex items-center space-x-1'>
          <FiUsers />
          <p>Followers: {followers}</p>
          <BsDot />
          <p>Following: {following}</p>
        </div>
        <div className='border-t border-gray-50 py-6'>
          <p>Description: {bio || 'No Bio'}</p>
          <p>Company: {company || 'No company'}</p>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
