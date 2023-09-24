import { useProfile, usePublications } from '@lens-protocol/react-web';
import BlogPost from './BlogPost';

export default function UserLens({ handle }) {
    if (!handle) return (
    <div className="p-8 mb-4">
        <div className="justify-center text-center p-24 border-2 border-orange-400 bg-orange-100 rounded-md">
        <h1 className='text-3xl'>This user has not verified on Lens</h1>
        </div>
    </div>)

    const { data: profile, loading } = useProfile({ handle: `${handle}.lens`});
    
    const {
        data: posts,
        loading: loadingPosts,
        hasMore,
        next,
      } = usePublications({
        profileId: profile?.id ?? '',
        limit: 10,
    });

    if (!profile) return;

    return (
      <div>
        <div className="px-24 mb-16">
          <div
            key={profile.name}
            className="flex flex-col gap-10 pt-12 sm:flex-row"
          >
            <img
              className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"
              src={profile?.picture.original.url}
              alt=""
            />
            <div className="max-w-xl flex-auto">
              <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                {profile.name}
              </h3>
              <p className="text-base leading-7 text-gray-600">
                {profile.handle} <b>Verified by Lens</b>
              </p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                {profile.bio}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                From the blog
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Learn how to grow your business with our expert advice.
              </p>
              <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
                {posts && posts.map((post) => {
                    const singlePost = post.__typename === 'Mirror' ? post.mirrorOf : post;
                    return <BlogPost post={singlePost} />
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}