import Navbar from '@/components/navbar';
import './home.css'
import VideoScroller from '@/features/explore/components/VideoScroller';
import { useFeed } from '@/features/explore/api';
import CreatePost from '@/features/explore/components/CreatePost';
import { useState } from 'react';

function Home() {
  const { data, isLoading } = useFeed();
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);

  return (
    <main className='flex flex-col h-full'>
      <Navbar />
      <div className='w-full flex-grow-1 flex justify-center overflow-y-hidden pt-6 gap-6'>
        <div className='w-[50px]'>
          <button className='p-4 bg-gray-100 rounded-full cursor-pointer' onClick={() => setCreatePostModalOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
          </button>
        </div>
        {!isLoading && (
          <VideoScroller posts={data || []} />
        )}
      </div>
      <CreatePost open={createPostModalOpen} onClose={setCreatePostModalOpen} />
    </main>
  )
}

export default Home;
