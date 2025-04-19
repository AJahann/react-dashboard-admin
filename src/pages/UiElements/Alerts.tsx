import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Alert from "../../components/ui/alert/Alert";

export default function Alerts() {
  return (
    <>
      <PageMeta
        title="React.js Alerts Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Alerts Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Alerts" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Success Alert">
          <Alert
            linkHref="/"
            linkText="Learn more"
            message="Be cautious when performing this action."
            title="Success Message"
            variant="success"
            showLink
          />
          <Alert
            message="Be cautious when performing this action."
            title="Success Message"
            variant="success"
            showLink={false}
          />
        </ComponentCard>
        <ComponentCard title="Warning Alert">
          <Alert
            linkHref="/"
            linkText="Learn more"
            message="Be cautious when performing this action."
            title="Warning Message"
            variant="warning"
            showLink
          />
          <Alert
            message="Be cautious when performing this action."
            title="Warning Message"
            variant="warning"
            showLink={false}
          />
        </ComponentCard>{" "}
        <ComponentCard title="Error Alert">
          <Alert
            linkHref="/"
            linkText="Learn more"
            message="Be cautious when performing this action."
            title="Error Message"
            variant="error"
            showLink
          />
          <Alert
            message="Be cautious when performing this action."
            title="Error Message"
            variant="error"
            showLink={false}
          />
        </ComponentCard>{" "}
        <ComponentCard title="Info Alert">
          <Alert
            linkHref="/"
            linkText="Learn more"
            message="Be cautious when performing this action."
            title="Info Message"
            variant="info"
            showLink
          />
          <Alert
            message="Be cautious when performing this action."
            title="Info Message"
            variant="info"
            showLink={false}
          />
        </ComponentCard>
      </div>
    </>
  );
}
