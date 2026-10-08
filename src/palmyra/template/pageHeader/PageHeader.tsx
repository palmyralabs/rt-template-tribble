import { ReactNode } from "react";
import { FiChevronRight } from "react-icons/fi";
import "./PageHeader.css";

interface Breadcrumb {
    label: string;
    onClick?: () => void;
}

interface WorkflowAction {
    id: any;
    name: string;
    onClick: () => void;
}

interface StatusInfo {
    text?: string;
    color?: string;
    bgColor?: string;
    dotColor?: string;
    icon?: ReactNode;
    label?: string;
    suffix?: string;
}

interface PageHeaderProps {
    breadcrumbs?: Breadcrumb[];
    title: string;
    subTitle?: string;
    badge?: ReactNode;
    status?: ReactNode;
    topActions?: ReactNode;
    statusInfo?: StatusInfo;
    statusExtra?: ReactNode;
    workflowActions?: WorkflowAction[];
    workflowColorMap?: Record<string, string>;
    workflowIconMap?: Record<string, ReactNode>;
    testId?: string;
}

const actionLabelMap: Record<string, string> = {
    approved: "Approve",
    rejected: "Reject",
    forwarded: "Forward",
    "suggest changes": "Suggest Changes",
    submitted: "Submit"
};

const getActionLabel = (name?: string) => {
    if (!name) return "";
    return actionLabelMap[name.toLowerCase()] || name;
};

const PageHeader = ({
    breadcrumbs,
    title,
    subTitle,
    badge,
    status,
    topActions,
    statusInfo,
    statusExtra,
    workflowActions,
    workflowColorMap = {},
    workflowIconMap = {},
    testId
}: PageHeaderProps) => {

    const showStatusBar =
        statusInfo?.text ||
        statusExtra ||
        (workflowActions && workflowActions.length > 0);

    return (
        <>
            <div className="py-page-header">
                <div className="py-page-header-main">
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <div className="py-page-header-breadcrumbs">
                            {breadcrumbs.map((crumb, idx) => (
                                <span key={idx} className="py-page-header-crumb-wrap">
                                    {idx > 0 && <FiChevronRight size={11} />}
                                    <span
                                        onClick={crumb.onClick}
                                        className={
                                            crumb.onClick
                                                ? "py-page-header-crumb-link"
                                                : idx === breadcrumbs.length - 1
                                                    ? "py-page-header-crumb-current"
                                                    : "py-page-header-crumb"
                                        }
                                    >
                                        {crumb.label}
                                    </span>
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="py-page-header-title-row" data-testid={testId}>
                        <h1 className="py-page-header-title">{title}</h1>
                        {badge}
                        {status}
                    </div>

                    {subTitle && <p className="py-page-header-subtitle">{subTitle}</p>}
                </div>

                {topActions && (
                    <div className="py-page-header-actions">{topActions}</div>
                )}
            </div>

            {showStatusBar && (
                <div className="py-page-header-statusbar">
                    <div className="py-page-header-status-group">
                        {statusInfo?.text && (
                            <div className={`py-page-header-status ${statusInfo.bgColor || ""}`}>
                                {statusInfo.icon}
                                <div>
                                    <p className={`py-page-header-status-label ${statusInfo.color || ""}`}>
                                        {statusInfo.label ?? "Approval Status"}
                                    </p>
                                    <p className="py-page-header-status-text">
                                        {statusInfo.text}
                                        {statusInfo.suffix !== undefined ? ` ${statusInfo.suffix}` : " for approval"}
                                    </p>
                                </div>
                                <div className={`py-page-header-status-dot ${statusInfo.dotColor || ""}`} />
                            </div>
                        )}

                        {statusExtra && (
                            <div className={`py-page-header-status-extra ${statusInfo?.text ? "py-page-header-status-extra-sep" : ""}`}>
                                {statusExtra}
                            </div>
                        )}
                    </div>

                    {workflowActions && workflowActions.length > 0 && (
                        <div className="py-workflow-actions">
                            <span className="py-workflow-actions-label">Actions</span>
                            <div className="py-workflow-actions-divider" />
                            {workflowActions.map((action) => (
                                <button
                                    key={action.id}
                                    onClick={action.onClick}
                                    className={`py-workflow-action-btn ${workflowColorMap[action.name?.toLowerCase()] || ""}`}
                                >
                                    {workflowIconMap[action.name?.toLowerCase()]}
                                    {getActionLabel(action.name)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export type { PageHeaderProps, Breadcrumb, WorkflowAction, StatusInfo };
export { PageHeader };
