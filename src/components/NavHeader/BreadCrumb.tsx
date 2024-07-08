import { IAuthLoader } from "@/router/AuthLoader";
import { findTreeNode } from "@/utils";
import { Breadcrumb } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { useLocation, useRouteLoaderData } from "react-router-dom";

export default function BradeCrumb() {
  const [breadList, setBreadList] = useState<(string | ReactNode)[]>()
  const { pathname } = useLocation() //获取当前页面路径

  const data = useRouteLoaderData('layout') as IAuthLoader

  useEffect(() => {
    const list = findTreeNode(data.menuList, pathname, [])
    setBreadList([<a href="/welcome">首页</a>, ...list])
  }, [pathname])


  return <Breadcrumb items={breadList?.map(item => ({ title: item }))} style={{ marginLeft: 10 }} />
}