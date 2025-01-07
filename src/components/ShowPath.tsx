"use client"
import React from 'react'
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

const ShowPath = () => {
  const pathname = usePathname(); // Get the current pathname
  const pathSegments = pathname.split('/').filter(Boolean); // Split path into segments

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    return { name: segment.charAt(0).toUpperCase() + segment.slice(1), href };
  });

  return (
    <div className='px-6 p-3'>
      {breadcrumbs.length > 0 ? (
        <Breadcrumb>
          <BreadcrumbList>
            {/* Home Link */}
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbs.length > 0 && <BreadcrumbSeparator />}
            {/* Dynamic Breadcrumb Items */}
            {breadcrumbs.map((breadcrumb, index) => (
              <BreadcrumbItem key={index}>
                {index < breadcrumbs.length - 1 ? (
                  <>
                    <Link href={breadcrumb.href}>
                      {breadcrumb.name}
                    </Link>
                    <BreadcrumbSeparator />
                  </>
                ) : (
                  <span>{breadcrumb.name}</span>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      ) : (
        <></> // Render this when no breadcrumbs
      )}
    </div>
  );
}

export default ShowPath;
