/* eslint-disable react/prop-types */
import Card from './Card';

function Section({ title, items, onClick }) {
  return (
    <div className="py-16 bg-gray-50 dark:bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-main dark:text-accent">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} onClick={() => onClick(item)} className="cursor-pointer">
              <Card {...item} inverted={index % 2 === 0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Section;
