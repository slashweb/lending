export default function BlogPost({ post }) {
    if (!post) return;

    console.log({ post })

    const { metadata } = post;

    // const singlePost = {
    //     content: 
    // }

    return(
        <article key={post.id} className="relative isolate flex flex-col gap-8 lg:flex-row">
                <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                  <img
                    src={metadata.media[0]?.original.url ?? 'https://res.cloudinary.com/ds3jemli8/image/upload/v1695529435/Banner_m6if2r.png' }
                    alt=""
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div>
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.datetime} className="text-gray-500">
                      {post.date}
                    </time>
                    <span
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {metadata.tags ? metadata.tags.join(',') : ''}
                    </span>
                  </div>
                  <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a>
                        <span className="absolute inset-0" />
                        {metadata.title}
                      </a>
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600">{metadata.content}</p>
                  </div>
                  <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                    <div className="relative flex items-center gap-x-4">
                      <img src={post.profile.picture.original.url} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <a href={''}>
                            <span className="absolute inset-0" />
                            {post.profile.name}
                          </a>
                        </p>
                        <p className="text-gray-600">{post.profile.bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
    )
}