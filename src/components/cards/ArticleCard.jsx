import {Image} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';

export function ArticleCard({blogHandle, article, loading}) {
  return (
    <div key={article.id}>
      <Link to={`/${blogHandle}/${article.handle}`} style={{ textDecoration: 'none' }}>
        {article.image && (
          <div className="card-image aspect-[3/2]">
            <Image
              alt={article.image.altText || article.title}
              className="object-cover w-full"
              data={article.image}
              height={400}
              loading={loading}
              sizes="(min-width: 768px) 50vw, 100vw"
              width={600}
              loaderOptions={{
                scale: 2,
                crop: 'center',
              }}
            />
          </div>
        )}
        <div className="mt-3 theo-h2" style={{ color: '#2A1B16', fontSize: 24, fontWeight: 200, lineHeight: 1.15 }}>{article.title}</div>
        <span className="block mt-1 acumin-semibold" style={{ color: '#2A1B16', fontWeight: 600, textTransform: 'uppercase' }}>{article.publishedAt}</span>
        <span className="block acumin-semibold" style={{ fontWeight: 600, textTransform: 'uppercase', color: "#C9AA77" }}>{article.readtime?.value}</span>
      </Link>
    </div>
  );
}
