import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Badge,
  Image,
  Button,
  Accordion,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { removeLoginToken } from "../../utils/storageUtils";
import { toast } from "../../components/Toast";
import { AdminRoutes } from "../../routes";
import { useRedeemNotification, useUserStore } from "../../store/store";
import { useTranslation } from "react-i18next";
import { InlineLoader } from "../Preloader";
import { useLogoutUser } from "../../reactQuery/hooks/customMutationHook";
import { navItems } from "../../utils/navItems";

const Sidebar = (props) => {
  const { t } = useTranslation(["sidebar"]);
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";
  const userDetails = useUserStore((state) => state.userDetails);
  const permissions = useUserStore((state) => state.permissions);
  const redeemNotification = useRedeemNotification(
    (state) => state.redeemNotification
  );
  const navigate = useNavigate();
  console.log("redeemNotification", redeemNotification);

  const logoutUser = () => {
    removeLoginToken();
    toast(t("logoutSuccessToast"), "success", "logoutToast");
    navigate(AdminRoutes.AdminSignin);
  };

  const { mutate: logout } = useLogoutUser({ onSuccess: () => logoutUser() });

  const activeAccordianKey = (path, key) => {
    return pathname.includes(path) && key;
  };

  const CollapsableNavItem = (props) => {
    const {
      permissionLabel,
      accordianPath,
      eventKey,
      titleKey,
      icon,
      children = null,
    } = props;

    if (permissionLabel && !Object.keys(permissions).includes(permissionLabel))
      return <></>;

    return (
      <Accordion
        as={Nav.Item}
        defaultActiveKey={activeAccordianKey(accordianPath, eventKey)}
        style={{
          backgroundColor: "rgb(38,43,64)",
          border: "none",
          boxShadow: "none",
        }}
      >
        <Accordion.Item
          eventKey={eventKey}
          style={{
            backgroundColor: "rgb(38,43,64)",
            border: "none",
            boxShadow: "none",
          }}
        >
          <Accordion.Button
            as={Nav.Link}
            style={{
              backgroundColor: "rgb(38,43,64)",
              border: "none",
              boxShadow: "none",
            }}
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
              <span className="sidebar-text">{t(titleKey)}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body
            className="multi-level"
            style={{ backgroundColor: "rgb(38,43,64)" }}
          >
            <Nav className="flex-column">{children}</Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const {
      title,
      permissionLabel,
      inSidePermissionLabel,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };
    if (permissionLabel && !Object.keys(permissions).includes(permissionLabel))
      return <></>;
    if (
      inSidePermissionLabel &&
      !permissions?.[permissionLabel]?.includes(inSidePermissionLabel)
    )
      return <></>;
    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={20}
                height={20}
                className="sidebar-icon svg-icon"
              />
            ) : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2"
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  const renderNavItems = (nItems) =>
    nItems.map((item) => {
      return item?.isCollapsable ? (
        <CollapsableNavItem
          permissionLabel={item.permissionLabel}
          key={item.titleKey}
          accordianPath={item.path}
          eventKey={item.titleKey}
          titleKey={item.titleKey}
          icon={item.icon}
        >
          {item?.options && renderNavItems(item.options)}
        </CollapsableNavItem>
      ) : (
        <NavItem
          badgeText={
            item.titleKey === "withdrawRequests" && redeemNotification?.PENDING
          }
          key={item.titleKey}
          title={t(item.titleKey)}
          link={item.link}
          icon={item.icon}
          permissionLabel={item?.permissionLabel}
          inSidePermissionLabel={item?.inSidePermissionLabel}
        />
      );
    });

  return (
    <>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar
          className={`collapse ${showClass} ${
            props.open ? "d-block" : "d-md-block"
          } sidebar d-md-block bg-primary text-white`}
        >
          <div className="sidebar-inner px-4 pt-3">
            <Nav className="flex-column pt-3 pt-md-0">
              {userDetails ? (
                <>
                  <h5 className="d-flex align-items-center m-auto mb-0">
                    {`${userDetails?.firstName} ${userDetails?.lastName}`}
                  </h5>
                </>
              ) : (
                <div className="d-flex justify-content-center">
                  <InlineLoader />
                </div>
              )}
              <hr />
              {renderNavItems(navItems)}
              <Button
                onClick={() => logout()}
                variant="secondary"
                className="upgrade-to-pro"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                {t("logout")}
              </Button>
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
export default Sidebar;
