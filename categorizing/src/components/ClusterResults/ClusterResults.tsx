import React from 'react';
import './ClusterResults.css';
import type { FinalClusterToShow } from '../../utils/Calcs/Calculation';


interface Props {
  result: FinalClusterToShow;
}

const ClusterResults: React.FC<Props> = ({ result }) => {
  const { Clustered, NotClustered } = result;

  return (
    <div className="cluster-results-container">
      <h2 className="cluster-title">Calculation Results</h2>

      {/* Clustered Section */}
      <div className="cluster-section">
        <h3>Clusters ({Clustered.length} found)</h3>

        {Clustered.length === 0 && (
          <p className="empty-text">No clusters were found.</p>
        )}

        {Clustered.map((cluster, index) => (
          <div key={index} className="cluster-card">
            <div className="cluster-header">
              <span>Cluster {index + 1}</span>
              <span className="cluster-count">
                {cluster.ClusterMembers.length} members
              </span>
            </div>

            <div className="cluster-members">
              {cluster.ClusterMembers.map((member, i) => (
                <span key={i} className="member-chip">
                  {member}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Not Clustered Section */}
      <div className="cluster-section not-clustered">
        <h3>
          Not Clustered ({NotClustered.ClusterMembers.length})
        </h3>

        {NotClustered.ClusterMembers.length === 0 ? (
          <p className="empty-text">All elements were clustered.</p>
        ) : (
          <div className="cluster-members">
            {NotClustered.ClusterMembers.map((member, i) => (
              <span key={i} className="member-chip">
                {member}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClusterResults;
