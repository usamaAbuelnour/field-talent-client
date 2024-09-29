/* eslint-disable react/prop-types */

const TimelineItem = ({ date, title, description

 }) => (
    <li className="mb-8">
      <div className="timeline-middle">
       
      </div>
      <div className={`${ "timeline-start"} md:w-2/3`}>
        <time className="font-mono italic text-sm mb-2 block w-fit text-nowrap ">{date}</time>
        <div className="text-lg font-bold text-main dark:text-accent mb-2 break-words">
          {title}
        </div>
        <p className="break-words text-sm lg:w-96">{description}</p>
      </div>
      <hr className="my-4" />
    </li>
  );
  
  const Timeline = ({ items }) => (
    <ul className="timeline timeline-snap-icon max-xl:timeline-compact timeline-vertical">
      {items.map((item, index) => (
        <TimelineItem
          key={item.title || `job-${index}`}
          date={item.date}
          title={item.title}
          description={item.description}
        />
      ))}
    </ul>
  );
  
  export default Timeline;