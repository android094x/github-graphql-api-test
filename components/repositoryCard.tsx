import { GiPlainCircle } from 'react-icons/gi'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'

type RepoNodeType = {
  id: string
  name: string
  description: string
  url: string
  languages: {
    [key: string]: string
  }[]
  isFav?: boolean
}

const RepositoryCard = ({
  id,
  name,
  description,
  url,
  languages,
  isFav = false,
}: RepoNodeType) => {
  const handleAddToFavRepo = async () => {
    await fetch('/api/add-fav-repo', {
      method: 'POST',
      body: JSON.stringify({
        id,
        name,
        description,
        url,
        languages,
      }),
    })
  }
  return (
    <li className='border-b p-4 h-32 flex flex-col justify-between'>
      <div className='flex justify-between'>
        <h3>{name}</h3>
        {isFav ? (
          <MdFavorite />
        ) : (
          <button type='button' onClick={handleAddToFavRepo}>
            <MdFavoriteBorder />
          </button>
        )}
      </div>
      <p>{description}</p>
      <div className='flex justify-between'>
        <div className='flex space-x-4'>
          {languages.map((language) => (
            <div className='flex items-center space-x-1' key={language.id}>
              <GiPlainCircle color={language.color} />
              <p>{language.name}</p>
            </div>
          ))}
        </div>
        <a
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          className='border border-white px-4 py-1 flex items-center rounded-full text-white hover:border-gray-300 hover:text-gray-300'
        >
          Visit Repo
        </a>
      </div>
    </li>
  )
}

export default RepositoryCard
